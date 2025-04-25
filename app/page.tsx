import WordCounterPages from "./wordcount/page";
import GuidePages from "./guide/page";

export default function Home() {
  return (
    <div className="px-6 max-w-screen-xl mx-auto">
      {/* Word Counter Section */}
      <section
        id="wordcount"
      >
        <WordCounterPages />
      </section>
      {/* Guide Section */}
      <section
        id="guide"
        className="min-h-screen flex items-center justify-center"
      >
        <GuidePages />
      </section>
    </div>
  );
}
