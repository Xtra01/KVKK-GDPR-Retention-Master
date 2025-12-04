import React, { useState } from 'react';
import { MISTAKES_QUIZ } from '../constants';
import { CheckCircle, XCircle, RefreshCcw } from 'lucide-react';

const MistakesQuiz: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, boolean | null>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (id: number, isMistake: boolean) => {
    setAnswers(prev => ({ ...prev, [id]: isMistake }));
  };

  const resetQuiz = () => {
    setAnswers({});
    setShowResults(false);
  };

  const calculateScore = () => {
    let score = 0;
    MISTAKES_QUIZ.forEach(q => {
      if (answers[q.id] === q.isMistake) score++;
    });
    return score;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900">Sık Yapılan Hatalar Testi</h2>
        <p className="text-slate-600">Aşağıdaki senaryoların KVKK/GDPR açısından bir "Hata" olup olmadığını belirleyin.</p>
      </div>

      <div className="space-y-4">
        {MISTAKES_QUIZ.map((q) => {
          const userAnswer = answers[q.id];
          const isCorrect = userAnswer === q.isMistake;
          
          return (
            <div key={q.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <p className="text-lg font-medium text-slate-800 flex-1">{q.question}</p>
                
                <div className="flex gap-3 flex-shrink-0">
                  <button
                    onClick={() => handleAnswer(q.id, true)}
                    disabled={showResults}
                    className={`px-4 py-2 rounded-lg font-medium border transition-all ${
                      userAnswer === true
                        ? 'bg-red-600 text-white border-red-600 ring-2 ring-offset-2 ring-red-200'
                        : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                    } ${showResults ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Bu Bir Hata
                  </button>
                  <button
                    onClick={() => handleAnswer(q.id, false)}
                    disabled={showResults}
                    className={`px-4 py-2 rounded-lg font-medium border transition-all ${
                      userAnswer === false
                        ? 'bg-green-600 text-white border-green-600 ring-2 ring-offset-2 ring-green-200'
                        : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                    } ${showResults ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Doğru Uygulama
                  </button>
                </div>
              </div>

              {/* Feedback Section */}
              {showResults && (
                <div className={`mt-4 p-4 rounded-lg flex items-start gap-3 ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  {isCorrect ? <CheckCircle className="w-6 h-6 flex-shrink-0" /> : <XCircle className="w-6 h-6 flex-shrink-0" />}
                  <div>
                    <span className="font-bold block mb-1">{isCorrect ? 'Tebrikler!' : 'Yanlış.'}</span>
                    <p className="text-sm">{q.explanation}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col items-center justify-center pt-8 border-t border-slate-200">
        {!showResults ? (
          <button
            onClick={() => setShowResults(true)}
            disabled={Object.keys(answers).length < MISTAKES_QUIZ.length}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-blue-200"
          >
            Sonuçları Göster
          </button>
        ) : (
          <div className="text-center animate-fade-in">
             <div className="text-4xl font-bold text-slate-900 mb-2">
                Skor: <span className="text-blue-600">{calculateScore()}</span> / {MISTAKES_QUIZ.length}
             </div>
             <p className="text-slate-500 mb-6">
                {calculateScore() === MISTAKES_QUIZ.length ? "Harika! Retention konusunda uzmansınız." : "Bazı konuları tekrar gözden geçirmelisiniz."}
             </p>
             <button
                onClick={resetQuiz}
                className="flex items-center gap-2 mx-auto text-slate-600 hover:text-slate-900 font-medium"
            >
                <RefreshCcw size={18} /> Testi Tekrarla
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MistakesQuiz;
