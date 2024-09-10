import { useState } from "react";
import { useInView, InView } from "react-intersection-observer";

const sections = ["Issues", "Cycles", "Roadmaps", "Workflows"];

const menuWidths = {
  Issues: {
    open: "124px",
    closed: "65px",
  },
  Cycles: {
    open: "128px",
    closed: "65px",
  },
  Roadmaps: {
    open: "178px",
    closed: "94px",
  },
  Workflows: {
    open: "176px",
    closed: "92px",
  },
};

function LandingPage() {
  const { ref, inView } = useInView({
    threshold: 0.2,
  });

  const [visibleSection, setVisibleSection] = useState(sections[0]);

  const setInView = (inView, entry) => {
    if (inView) {
      console.log(entry);
      setVisibleSection(entry.target.getAttribute("id"));
    }
  };

  return (
    <div className="flex flex-col pb-12 bg-gray-950">
      <header className="fixed top-0 left-0 right-0 h-12 flex justify-center items-center backdrop-blur-[30px] border-t-[rgba(255,255,255,0.10;border-right:0px)_solid_rgba(255,255,255,0.10;] z-30 w-[100%] px-60  border-l-[0px)] border-l-[rgba(255,255,255,0.10;] border-t-[0px)] border-b-[rgba(255,255,255,0.10);] border-solid border-b max-md:max-w-full max-md:px-5">
        <div className="flex items-center gap-0 max-md:max-w-full max-md:flex-wrap">
          <span className="flex items-start justify-between gap-5 my-auto max-md:max-w-full max-md:flex-wrap">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/4b523ea246df006b256ac3b17a1412ca552cc8d59abf527fa71f205b8d3eabc8?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
              className="aspect-[4] object-contain object-center w-[72px] overflow-hidden self-center shrink-0 max-w-full my-auto"
              alt=""
            />
            <span className="justify-between items-stretch self-stretch flex gap-0.5">
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-white grow whitespace-nowrap"
              >
                Features
              </a>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7ae9c14df945b40f7753fc5da87d24731981a59935230f28f03594f20464c75b?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
                className="aspect-square object-contain object-center w-3.5 overflow-hidden self-center shrink-0 max-w-full my-auto"
                alt=""
              />
            </span>
            <div className="self-stretch text-sm font-semibold leading-6 text-white">
              Method
            </div>
            <div className="self-stretch text-sm font-semibold leading-6 text-white">
              Customers
            </div>
            <div className="self-stretch text-sm font-semibold leading-6 text-white">
              Changelog
            </div>
            <div className="self-stretch text-sm font-semibold leading-6 text-white">
              Pricing
            </div>
            <span className="justify-between items-stretch self-stretch flex gap-0.5">
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-white grow whitespace-nowrap"
              >
                Company
              </a>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7ae9c14df945b40f7753fc5da87d24731981a59935230f28f03594f20464c75b?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
                className="aspect-square object-contain object-center w-3.5 overflow-hidden self-center shrink-0 max-w-full my-auto"
                alt=""
              />
            </span>
            <div className="self-stretch text-sm font-semibold leading-6 text-white grow whitespace-nowrap">
              Contact
            </div>
          </span>
          <span className="flex items-center self-stretch justify-between gap-5 pl-20 max-md:max-w-full max-md:flex-wrap max-md:pl-5">
            <div className="my-auto text-sm font-semibold leading-6 text-white grow whitespace-nowrap">
              Login
            </div>
            <button className="text-white text-sm font-medium leading-8 whitespace-nowrap justify-center items-stretch bg-indigo-500 self-stretch aspect-[2.21875] px-2.5 rounded-3xl">
              Sign up
            </button>
          </span>
        </div>
      </header>
      <nav
        className={`z-20 bg-white/5 fixed flex  px-60 text-white list-none left-0 right-0 top-12 transition-all duration-[320ms] ${
          inView
            ? "opacity-100 translate-y-0 backdrop-blur-[12px]"
            : "opacity-0 translate-y-[-100%] backdrop-blur-none"
        }`}
      >
        <div className="flex items-center justify-center h-12 gap-4 text-sm">
          {sections.map((section) => (
            <div
              key={section}
              className={`transition-all duration-300 flex rounded-full border border-white/5 bg-white/5 overflow-hidden  px-3 py-0.5 backdrop-blur-none`}
              style={{
                width:
                  visibleSection === section
                    ? menuWidths[section].open
                    : menuWidths[section].closed,
              }}
            >
              <span
                className={`-ml-2 mr-2 px-2 ${
                  visibleSection === section
                    ? `bg-indigo-500/70 border-indigo-50 rounded-full`
                    : ``
                }`}
              >
                {section}
              </span>
              <span>{section}</span>
            </div>
          ))}
        </div>
      </nav>
      <div className="items-center self-center flex w-[1260px] max-w-full flex-col  pt-12 px-16 max-md:px-5">
        <div className="flex w-[822px] max-w-full flex-col mt-16">
          <div className="animate-slidein [--slidein-delay:300ms] opacity-0 justify-center items-stretch border backdrop-blur-[6px] bg-white bg-opacity-10 self-center flex gap-1 px-2.5 rounded-3xl border-solid border-white border-opacity-10">
            <div className="text-sm font-medium leading-7 text-stone-50 grow whitespace-nowrap">
              Introducing Linear Asks
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b1fc2c7947a597ca073fab420e3a014f375e35ceb9709896e0b7952bdcf7eb16?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
              className="self-center object-contain object-center w-4 max-w-full my-auto overflow-hidden aspect-square shrink-0"
              alt=""
            />
          </div>
          <h1 className="animate-slidein [--slidein-delay:300ms] opacity-0 text-white text-center text-7xl font-medium leading-[80px] self-stretch mt-4 max-md:max-w-full max-md:text-4xl max-md:leading-10">
            Linear is a better way <br /> to build products
          </h1>
          <p className="animate-slidein [--slidein-delay:500ms] opacity-0 text-slate-300 text-center text-2xl leading-7 max-w-[612px] self-center mt-7 max-md:max-w-full">
            Meet the new standard for modern software development. <br />{" "}
            Streamline issues, sprints, and product roadmaps.
          </p>
          <div className="animate-slidein [--slidein-delay:700ms] opacity-0 justify-center items-stretch bg-indigo-500 self-center flex gap-0.5 mt-12 pl-5 pr-3 py-2.5 rounded-3xl max-md:mt-10">
            <div className="text-base font-medium leading-8 text-white grow whitespace-nowrap">
              Get started
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/bb4b6ebd2492ccf447648fd994e00d5c552deb38e4b1d3359193e8de49adbe74?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
              className="aspect-square object-contain object-center w-[18px] overflow-hidden self-center shrink-0 max-w-full my-auto"
              alt=""
            />
          </div>
        </div>
      </div>
      <img
        loading="lazy"
        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/7e641a08b262ec14a02a56418279ca9d1ddc2de843a6c9653b885703f60302ad?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/7e641a08b262ec14a02a56418279ca9d1ddc2de843a6c9653b885703f60302ad?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/7e641a08b262ec14a02a56418279ca9d1ddc2de843a6c9653b885703f60302ad?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/7e641a08b262ec14a02a56418279ca9d1ddc2de843a6c9653b885703f60302ad?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/7e641a08b262ec14a02a56418279ca9d1ddc2de843a6c9653b885703f60302ad?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/7e641a08b262ec14a02a56418279ca9d1ddc2de843a6c9653b885703f60302ad?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/7e641a08b262ec14a02a56418279ca9d1ddc2de843a6c9653b885703f60302ad?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/7e641a08b262ec14a02a56418279ca9d1ddc2de843a6c9653b885703f60302ad?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
        className="aspect-[1.76] object-contain object-center w-[1200px] overflow-hidden self-center max-w-full mt-32 max-md:mt-10"
        alt=""
      />
      <div className="items-center self-center flex w-[1260px] max-w-full flex-col mt-64 mb-60 px-8 max-md:my-10 max-md:px-5">
        <div className="justify-center text-stone-50 text-center text-2xl leading-7 max-w-[528px] max-md:max-w-full">
          Powering the world’s best product teams. <br />{" "}
          <span className="text-stone-50">
            From next-gen startups to established enterprises.
          </span>
        </div>
        <div className="flex flex-wrap items-start content-start self-stretch justify-between gap-5 pr-5 mt-14 max-md:max-w-full max-md:mt-10">
          <div className="flex grow basis-[0%] flex-col items-center mt-3.5 self-start">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1bacbf83ffedb4e26d2ba5abad38780b06ba4dd47203c22ef1c1e985f36063c?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
              className="aspect-[3.88] object-contain object-center w-[93px] fill-stone-50 overflow-hidden max-w-full"
              alt=""
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2f64a28dbead741430b6d9ed67f6edb30d1d1aaf6d3920df160870af54a9c6a5?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
              className="aspect-[3.2] object-contain object-center w-40 overflow-hidden mt-11 max-md:mt-10"
              alt=""
            />
          </div>
          <div className="flex grow basis-[0%] flex-col items-center mt-3.5 self-start">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7763731d1ccf9780ff2e99a0f5c45b21eefcd34aae241020f7e2b96a2063d60c?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
              className="aspect-[2.63] object-contain object-center w-[63px] fill-stone-50 overflow-hidden max-w-full"
              alt=""
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/19e7ab4376e23017b1751f394c15ae860bd9d1781fe97cae40a2ccf23d05ae9a?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
              className="aspect-[3.2] object-contain object-center w-40 overflow-hidden mt-11 max-md:mt-10"
              alt=""
            />
          </div>
          <div className="self-stretch flex grow basis-[0%] flex-col items-center">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f6ef456f2a883f8737f4a102d428672eb1801bbe3df929bebb249a05c6679ac8?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
              className="aspect-[3.33] object-contain object-center w-40 overflow-hidden"
              alt=""
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/62c82ef8c553f237bcb127aa272b5d1192c7e66f963eb4ae1ba759cc66473f32?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
              className="aspect-[3.2] object-contain object-center w-40 overflow-hidden mt-8"
              alt=""
            />
          </div>
          <div className="flex grow basis-[0%] flex-col items-center self-start">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/629e9a4eac75a2bb5391f94f7213a653125033f02c0bcedf1610d09325339df7?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
              className="aspect-[3.2] object-contain object-center w-40 overflow-hidden"
              alt=""
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e42ae2bfe4cbc948937db9ae7c3aebc0d845796dfd5a9c6165d27533e2c5a08c?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
              className="aspect-[3.2] object-contain object-center w-20 fill-stone-50 overflow-hidden max-w-full mt-11 max-md:mt-10"
              alt=""
            />
          </div>
          <div className="flex grow basis-[0%] flex-col items-center mt-3 self-start">
            <div className="flex items-stretch gap-2.5">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d8bfa3cd2f0f5b3fe546af866188f742d995798d454fa5f037c8ff923b630fd5?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
                className="aspect-square object-contain object-center w-[25px] fill-stone-50 overflow-hidden shrink-0 max-w-full"
                alt=""
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b1636a976790c509e676f0fccdd49d0c3a3c0f7feb0e66d209ca07af0dfdebd8?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
                className="aspect-[4.88] object-contain object-center w-[78px] fill-stone-50 overflow-hidden self-center shrink-0 max-w-full my-auto"
                alt=""
              />
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/3d513ca4856e226eeae86f880971f3c32c8e8e9ed4e8b32001ff8e237323d8fb?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
              className="aspect-[3.2] object-contain object-center w-40 overflow-hidden mt-11 max-md:mt-10"
              alt=""
            />
          </div>
          <div className="flex grow basis-[0%] flex-col items-center mt-2 self-start">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/150e5e25a17c9cc8b196f672a7ab454d836a9576ffb698fb0106a258531d378e?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
              className="aspect-[1.19] object-contain object-center w-[43px] fill-stone-50 overflow-hidden max-w-full"
              alt=""
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2a43e27b081fc898156f904c26370f7635bc89a6d7305e2097b401e2da3d1af6?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
              className="aspect-[3.2] object-contain object-center w-40 overflow-hidden mt-10"
              alt=""
            />
          </div>
        </div>
      </div>
      <div id="section-wrapper" ref={ref}>
        {sections.map((section) => (
          <InView onChange={setInView} threshold={0.8} key={section}>
            {({ ref }) => {
              return (
                <div
                  id={section}
                  ref={ref}
                  className="flex justify-center items-center py-[300px] text-white text-5xl"
                >
                  {section}
                </div>
              );
            }}
          </InView>
        ))}
      </div>
    </div>
  );
}

export default LandingPage;