import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('loading');
  const [proposerName, setProposerName] = useState('');
  const [proposeeName, setProposeeName] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [noClickCount, setNoClickCount] = useState(0);

  const questions = [
    `Do you like ${proposerName}?`,
    `Do you love ${proposerName}?`,
    `Will ${proposeeName} take ${proposerName} as your partner by shared vows?`
  ];

  const handleStart = () => {
    if (proposerName && proposeeName) {
      setCurrentPage('story');
    }
  };

  const handleYes = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setNoClickCount(0);
    } else {
      setCurrentPage('surprise');
    }
  };

  const handleNo = () => {
    setNoClickCount(noClickCount + 1);
  };

  const getNoButtonText = () => {
    if (noClickCount === 0) return 'No';
    return 'Are you ' + 'really '.repeat(noClickCount) + 'sure?';
  };

  const yesButtonScale = noClickCount === 0 ? 1 : Math.min(1 + noClickCount * 2, 20);

  return (
    <div className="app">
      <div className="hearts-bg">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`heart heart-${i}`}>💖</div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {currentPage === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="page"
          >
            <h1>💕 A Special Question 💕</h1>
            <div className="input-group">
              <input
                type="text"
                placeholder="Proposer's Name"
                value={proposerName}
                onChange={(e) => setProposerName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Proposee's Name"
                value={proposeeName}
                onChange={(e) => setProposeeName(e.target.value)}
              />
              <button onClick={handleStart} disabled={!proposerName || !proposeeName}>
                Start 💖
              </button>
            </div>
          </motion.div>
        )}

        {currentPage === 'story' && (
          <motion.div
            key="story"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="page"
          >
            <h2>Once upon a time... 📖</h2>
            <p className="story-text">
              There was someone special named <strong>{proposerName}</strong> who had been thinking about 
              <strong> {proposeeName}</strong> a lot lately. Every day, every moment, every heartbeat 
              reminded them of how amazing you are. Today, {proposerName} wants to ask you something 
              very important... 💕
            </p>
            <button onClick={() => setCurrentPage('questions')}>
              Proceed to Surprise ✨
            </button>
          </motion.div>
        )}

        {currentPage === 'questions' && (
          <motion.div
            key="questions"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="page"
          >
            <h2>{questions[questionIndex]}</h2>
            <div className="button-container">
              <motion.button
                className="yes-btn"
                onClick={handleYes}
                animate={{ 
                  scale: yesButtonScale,
                  width: noClickCount > 3 ? '100vw' : 'auto',
                  height: noClickCount > 3 ? '100vh' : 'auto',
                  position: noClickCount > 3 ? 'fixed' : 'relative',
                  top: noClickCount > 3 ? 0 : 'auto',
                  left: noClickCount > 3 ? 0 : 'auto',
                  zIndex: noClickCount > 3 ? 9999 : 'auto'
                }}
                whileHover={{ scale: yesButtonScale * 1.05 }}
                whileTap={{ scale: yesButtonScale * 0.98 }}
                style={{
                  fontSize: noClickCount > 3 ? '4rem' : '18px',
                  borderRadius: noClickCount > 3 ? '0' : '25px'
                }}
              >
                Yes! 💕
              </motion.button>
              <motion.button
                className="no-btn"
                onClick={handleNo}
                animate={{ scale: Math.max(1 - noClickCount * 0.1, 0.3) }}
                whileHover={{ scale: Math.max(1.1 - noClickCount * 0.1, 0.33) }}
              >
                {getNoButtonText()}
              </motion.button>
            </div>
          </motion.div>
        )}

        {currentPage === 'surprise' && (
          <motion.div
            key="surprise"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="page surprise-page"
          >
            <motion.h1
              animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🎉 YES! 🎉
            </motion.h1>
            <div className="celebration">
              <p>{proposerName} and {proposeeName} are now boyfriend and girlfriend! 💕</p>
              <div className="gif-container">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUIMrFRAPSNHnv_OyBpdNLYvSUu3LSatAtBA&s" 
                  alt="Cute celebration"
                  onError={(e) => {e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><text y="100" font-size="60">💕🎉💕</text></svg>'}}
                />
              </div>
              <motion.div
                className="final-message"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Love wins! 💖✨
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;