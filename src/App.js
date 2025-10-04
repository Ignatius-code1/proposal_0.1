import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

const LetterPage = ({ proposerName, proposeeName, onContinue }) => {
  const [dragY, setDragY] = useState(0);
  const [isOpened, setIsOpened] = useState(false);
  
  const handleDrag = (event, info) => {
    const newY = Math.max(0, Math.min(100, info.point.y / 3));
    setDragY(newY);
    if (newY > 60) {
      setIsOpened(true);
    }
  };
  
  return (
    <motion.div
      key="letter"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="page letter-page"
    >
      <div className="envelope">
        <div className="drag-instruction">
          {!isOpened ? "Pull the string down to open 👇" : ""}
        </div>
        {!isOpened && (
          <motion.div 
            className="envelope-string"
            drag="y"
            dragConstraints={{ top: 0, bottom: 100 }}
            onDrag={handleDrag}
            whileHover={{ scale: 1.1 }}
          >
            📎
          </motion.div>
        )}
        <motion.div 
          className="envelope-flap"
          animate={{ rotateX: dragY > 30 ? -180 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div 
          className="letter-content"
          animate={{ 
            y: isOpened ? 0 : 100, 
            opacity: isOpened ? 1 : 0 
          }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="letter-title">My dearest {proposeeName} 🌹</h2>
          <div className="letter-text">
            <p>This isn't just a recap; it's a look back at the moments that quietly changed everything for me.</p>
            <p>From the first second my eyes landed on you outside the church that day, something inside me just knew I had to get closer. You felt like a warmth I needed. I know I was awkward, rambling through my greetings, and when I thought you weren't interested, I brushed it off—but the truth is, you had already left a mark on my heart.</p>
            <p>For months and years after, seeing you with Mitchell and Kim became my private little comfort. I'd play out entire scenarios in my mind—us laughing, the four of us just hanging out—especially during my quiet walks. I admit, I'm an overthinker, and my shyness told me that this dream was impossible, a beautiful, torturous impossibility.</p>
            <p><strong>Then, you texted me.</strong></p>
            <p>That moment—I was speechless. A wave of 'No way, did that just happen?' washed over me! Even when we paused talking for a while, I knew deep down... our story wasn't over. It was only just beginning.</p>
            <p><strong>This New Space</strong></p>
            <p>...I felt seen, truly seen, for the first time in a long time. That text, it wasn't a world-stopping event for everyone else, but to me, it ignited a spark I honestly didn't know I had. I never thought I could feel this way.</p>
            <p>The fact that you would call me late at night, choosing to spend your quiet, personal time talking to me instead of anything else—it felt like a fortune. Honestly, for a moment, it felt like I was wealthy. Those random photos, the videos, and your voice notes became the highlight reel of my August 2024 holiday. They were the absolute best moments.</p>
            <p>Then, just when I thought I'd seen all the good things you had to offer, you invited me to your prom. To be honest, I thought you'd have fun, the typical kind of fun that happens at a big party. I imagined the night getting crazy, as it often does for girls who get that chance.</p>
            <p>But that's where I was completely wrong, in the most wonderful way.</p>
            <p>You did have fun, yes, but not in the way I expected. You showed me what it means to be seen and to truly matter to someone. You chose to spend the night with me. You were physically in South Africa, celebrating your prom, and I was here in Kenya, yet we had a blast. Correct me if I'm wrong, but I truly believe we had more fun together than most of the people there who were actually standing side-by-side.</p>
            <p>You redefined what "together" means.</p>
            <p>This is more than just a feeling; it's a reality we built across a continent. What is this new, amazing space we've found, where distance just melts away when we talk?</p>
          </div>
          <motion.button 
            className="continue-btn"
            onClick={onContinue}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue to the Question 💕
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

function App() {
  const [currentPage, setCurrentPage] = useState('loading');
  const [proposerName, setProposerName] = useState('');
  const [proposeeName, setProposeeName] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [noClickCount, setNoClickCount] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('/the night we met - lord huron (slowed n reverb) - starclouds.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;
    audioRef.current.onerror = () => {
      console.log('Audio file not found.');
    };
  }, []);

  const questions = [
    `Do you like ${proposerName}?`,
    `Do you love ${proposerName}?`,
    `Will ${proposeeName} take ${proposerName} as your partner by shared vows?`
  ];

  const handleStart = () => {
    if (proposerName && proposeeName) {
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      }
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

  const yesButtonScale = Math.min(1 + noClickCount * 0.3, 5);

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
            <button onClick={() => setCurrentPage('letter')}>
              There's more... 💌
            </button>
          </motion.div>
        )}

        {currentPage === 'letter' && (
          <LetterPage 
            proposerName={proposerName} 
            proposeeName={proposeeName} 
            onContinue={() => setCurrentPage('questions')}
          />
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
                animate={{ scale: yesButtonScale }}
                whileHover={{ scale: yesButtonScale * 1.1 }}
                whileTap={{ scale: yesButtonScale * 0.95 }}
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
              <p>Congratulations {proposerName} & {proposeeName}! 💕</p>
              <div className="gif-container">
                <img 
                  src="https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.gif" 
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