import { ComponentProps, useRef, useState } from "react";
import { Button, Icon } from "..";
import clsx from "clsx";
import { CSVLink } from "react-csv";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props<T extends any[]> = Pick<
  ComponentProps<typeof Button>,
  | "size"
  | "onClick"
  | "ref"
  | "className"
  | "loading"
  | "disabled"
  | "className"
> & {
  getData: () => Promise<T | void | undefined>;
  format: (value: T[number]) => Record<string, string | number>;
  filename?: string;
  onError?: (error: unknown) => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ExportButton = <T extends any[]>({
  className,
  format,
  getData,
  filename = "export",
  onError,
  ...props
}: Props<T>) => {
  const [rows, setRows] = useState<ReturnType<typeof format>[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const linkRef = useRef<any>(null);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const data = await getData();
      if (data && data.length > 0) {
        setRows(data.map(format));
        setTimeout(() => {
          linkRef.current.link.click();
        });
      }
    } catch (error) {
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        {...props}
        leftIcon={<Icon name="export" />}
        className={clsx(
          "bg-white text-black border-2 border-gray-200 hover:bg-gray-100",
          className,
        )}
        onClick={onClick}
        loading={isLoading}
        size="md"
      >
        Export
      </Button>
      <CSVLink
        ref={linkRef}
        data={rows}
        className="hidden"
        filename={filename}
      />
    </>
  );
};
