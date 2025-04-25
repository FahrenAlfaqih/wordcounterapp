"use client";

import { useState } from "react";
import { TypeAnimation } from "react-type-animation";

export default function WordCounterPages() {
  const [text, setText] = useState("");
  const [wordCounter, setWordCounter] = useState(0);
  const [charCounter, setCharCounter] = useState(0);
  const [sentenceCounter, setSentenceCounter] = useState(0);
  const [paragraphCounter, setParagraphCounter] = useState(0);

  const [readingLevel, setReadingLevel] = useState(0);
  const [readingLevelLabel, setReadingLevelLabel] = useState("");
  const [readingTime, setReadingTime] = useState("");
  const [speakingTime, setSpeakingTime] = useState("");

  const handleTextChange = (event) => {
    const inputText = event.target.value;
    setText(inputText);

    const words = inputText.trim().split(/\s+/);
    const wordCount = words.length === 1 && words[0] === "" ? 0 : words.length;

    setWordCounter(wordCount);
    setCharCounter(inputText.replace(/\s+/g, "").length);

    const sentences = inputText.split(/[.!?]/).filter(Boolean);
    const sentenceCount = sentences.length;
    setSentenceCounter(sentenceCount);

    const paragraphs = inputText.split(/\n+/).filter(Boolean);
    setParagraphCounter(paragraphs.length);

    const syllables = countSyllables(inputText);
    let fleschReadingLevel =
      0.39 * (wordCount / sentenceCount) +
      11.8 * (syllables / wordCount) -
      15.59;

    fleschReadingLevel = Math.floor(fleschReadingLevel);

    setReadingLevel(fleschReadingLevel);

    let levelLabel = "Tingkat bacaan tidak diketahui";
    if (fleschReadingLevel >= 0 && fleschReadingLevel <= 5) {
      levelLabel = "Kelas 1-5 SD – Sangat mudah dipahami anak-anak";
    } else if (fleschReadingLevel >= 6 && fleschReadingLevel <= 8) {
      levelLabel = "Kelas 6-8 SMP – Mudah dipahami pelajar SMP";
    } else if (fleschReadingLevel >= 9 && fleschReadingLevel <= 10) {
      levelLabel = "Kelas 9-10 SMA – Mulai kompleks, untuk remaja";
    } else if (fleschReadingLevel >= 11 && fleschReadingLevel <= 12) {
      levelLabel = "Kelas 11-12 SMA – Cukup kompleks, dewasa menengah";
    } else if (fleschReadingLevel >= 13 && fleschReadingLevel <= 16) {
      levelLabel = "Mahasiswa – Teks akademik tingkat universitas";
    } else if (fleschReadingLevel >= 17) {
      levelLabel = "Pascasarjana – Sangat kompleks (jurnal ilmiah)";
    }

    setReadingLevelLabel(levelLabel);
    const estimatedReadingTime = (wordCount / 200) * 60;
    setReadingTime(formatTime(estimatedReadingTime));

    const estimatedSpeakingTime = (wordCount / 130) * 60;
    setSpeakingTime(formatTime(estimatedSpeakingTime));
  };

  const countSyllables = (text) => {
    let total = 0;
    const vowels = "aeiouy";
    const words = text.trim().split(/\s+/);
    words.forEach((word) => {
      word = word.toLowerCase().replace(/[^a-z]/g, "");
      let syllableCount = 0;
      let prevVowel = false;
      for (let char of word) {
        const isVowel = vowels.includes(char);
        if (isVowel && !prevVowel) {
          syllableCount++;
        }
        prevVowel = isVowel;
      }
      if (word.endsWith("e")) {
        syllableCount--;
      }
      if (syllableCount <= 0) syllableCount = 1;
      total += syllableCount;
    });
    return total;
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes} menit ${seconds} detik`;
  };

  return (
    <>
      <div className="space-y-3 px-4 py-6 bg-gray-100 min-h-screen">
        <div className="flex gap-4">
          {/* Info Box */}
          <div className="basis-2/3  w-full p-4 bg-white rounded-xl shadow-lg border border-blue-100">
            <h1 className="text-3xl font-semibold text-blue-900 break-words">
              📊 <span className="text-blue-700">{wordCounter} Kata</span>{" "}
              &nbsp;|&nbsp;
              <span className="text-purple-700">{charCounter} Karakter</span>
            </h1>
          </div>

          {/* Detail Box */}
          <div className="basis-1/3 w-full p-4 bg-white rounded-xl shadow-lg border border-blue-100">
            <h1 className="text-3xl font-semibold text-blue-900 break-words">
              🔍<span className="text-blue-950">Detail</span>{" "}
            </h1>
          </div>
        </div>

        <div className="flex gap-4">
          {/* Text Area Box */}
          <div className="basis-2/3 w-full p-6 bg-white rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-blue-950 mb-3">🔗
              
              <TypeAnimation
                sequence={[" Masukkan Teks", 1000, "", 100]}
                wrapper="span"
                speed={10}
                repeat={Infinity}
                className="text-blue-950"
              />
            </h2>

            <textarea
              value={text}
              onChange={handleTextChange}
              placeholder="Tulis sesuatu di sini..."
              rows="13"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-900 resize-none"
            />
          </div>

          {/* Detail Box */}
          <div className="basis-1/3 w-full p-4 bg-white rounded-xl shadow-lg border border-blue-100">
            <div className="mt-4 space-y-1 text-gray-700 text-md">
              <p>
                📝 Kata <strong>{wordCounter}</strong>
              </p>
              <p>
                🔡 Karakter <strong>{charCounter}</strong>
              </p>
              <p>
                📚 Kalimat <strong>{sentenceCounter}</strong>
              </p>
              <p>
                🧾 Paragraf <strong>{paragraphCounter}</strong>
              </p>
              <p>
                📖 Tingkat Bacaan: <strong>{readingLevel.toFixed(2)}</strong>
              </p>
              <p>
                👤 Tingkat Pembaca: <strong>{readingLevelLabel}</strong>
              </p>
              <p>
                ⏱️ Waktu Membaca: <strong>{readingTime}</strong>
              </p>
              <p>
                🗣️ Waktu Berbicara: <strong>{speakingTime}</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 min-h-screen"></div>
      </div>


    </>
  );
}
