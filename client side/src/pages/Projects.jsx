export default function Projects() {

  return (

    <div className="min-h-screen flex items-center justify-center">

      <div className="max-w-2xl mx-auto p-3 text-center">

        <h1 className="text-3xl font-semibold">
          Projects
        </h1>

        <p className="text-md text-gray-500 mt-5">
          Build fun and engaging projects while learning HTML, CSS, and JavaScript!
        </p>

        <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center mt-5">

          <div className="flex-1 justify-center flex flex-col">

            <h2 className="text-2xl">
              Want to learn HTML, CSS and JavaScript by building fun and engaging projects?
            </h2>

            <p className="text-gray-500 my-2">
              Check our 100 js projects website and start building your own projects
            </p>

            <a
              href="https://www.youtube.com/watch?v=G3e-cpL7ofc"
              target="_blank"
              rel="noopener noreferrer"
            >

              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-tl-xl rounded-bl-none rounded-br-xl rounded-tr-none px-5 py-3 hover:opacity-90 transition w-full">
                100 JS Projects Website
              </button>

            </a>

          </div>

          <div className="p-7 flex-1">

            <img
              src="data:image/png;base64,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"
              alt="project"
              className="rounded-lg"
            />

          </div>

        </div>

      </div>

    </div>

  );

}