"use client";

import { useState } from "react";

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
    <div className="max-w-xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4 text-black">🔗 Text Area</h1>
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Masukkan teks di sini..."
        rows="6"
        className="w-full p-2 border rounded-lg text-black"
      />
      <p className="text-gray-800">Jumlah Kata : {wordCounter}</p>
      <p className="text-gray-800">Jumlah Karakter : {charCounter}</p>
      <p className="text-gray-800">Jumlah Kalimat : {sentenceCounter}</p>
      <p className="text-gray-800">Jumlah Paragraf : {paragraphCounter}</p>
      <p className="text-gray-800">
        Tingkat Bacaan : {readingLevel.toFixed(2)}
      </p>
      <p className="text-gray-800">Tingkat Pembaca : {readingLevelLabel}</p>
      <p className="text-gray-800">Waktu Membaca : {readingTime}</p>
      <p className="text-gray-800">Waktu Berbicara : {speakingTime}</p>
    </div>
  );
}
