import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('loading');
  const [proposerName, setProposerName] = useState('');
  const [proposeeName, setProposeeName] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [noClickCount, setNoClickCount] = useState(0);
  const [isConfettiActive, setIsConfettiActive] = useState(false);
  const audioRef = useRef(null);
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (questionIndex === questions.length - 1) {
      setIsConfettiActive(true);
    }
  }, [questionIndex]);

  useEffect(() => {
    if (isConfettiActive) {
      const timer = setTimeout(() => {
        setIsConfettiActive(false);
      }, 10000); // Confetti for 10 seconds then fade out
      return () => clearTimeout(timer);
    }
  }, [isConfettiActive]);

  const questions = [
    `Since the first night that you and ${proposerName} slept knowing that each other existed and that you wouldn't mind them tagging along your life, have you enjoyed their company?`,
    `When you say ${proposerName}'s name, is there a weight behind it? Is this more than just a comfort or a friend? If I were to truly ask you, right now, does this feeling have a depth that will not end?`,
    `Since ${proposeeName} came near, the world has a different color. It feels like a beautiful song ${proposerName} has been waiting to hear. Will ${proposeeName} be able to make this feeling real, and be ${proposerName}'s girlfriend?`,];

  const handleStart = () => {
    if (proposerName && proposeeName) {
      if (!proposerName.toLowerCase().includes('ignatius')) {
        setCurrentPage('lovelyDay');
        return;
      }
      if (!audioRef.current) {
        audioRef.current = new Audio('/the night we met - lord huron (slowed n reverb) - starclouds.mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = 0.3;
        audioRef.current.addEventListener('ended', () => {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
        });
      }
      audioRef.current.play().catch(e => console.log('Audio blocked:', e));
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

  const yesButtonScale = noClickCount === 0 ? 1 : noClickCount === 1 ? 3 : 1;
  
  const getNoButtonClass = () => {
    if (noClickCount >= 4) return 'no-btn hidden';
    if (noClickCount === 3) return 'no-btn moving-fast';
    if (noClickCount >= 2) return 'no-btn moving';
    return 'no-btn';
  };





  return (
    <div className="app">
      {isConfettiActive && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={200}
          recycle={false}
          run={isConfettiActive}
        />
      )}
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

        {currentPage === 'lovelyDay' && (
          <motion.div
            key="lovelyDay"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="page"
          >
            <h1>Have a lovely day! 🌸</h1>
            <p className="story-text">Wishing you all the best and a wonderful time ahead. 💕</p>
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
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="page letter-page"
          >
            <motion.div 
              className="envelope"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="envelope-flap"
                initial={{ rotateX: 0 }}
                animate={{ rotateX: -180 }}
                transition={{ delay: 1, duration: 1 }}
              />
              <motion.div 
                className="letter-content"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
              >
                <h2 className="letter-title">🌹 My dearest {proposeeName} 🌹</h2>
                <div className="letter-text">
                  <p>This isn't just a recap; it's a look back at the moments that quietly changed everything for me.</p>
                  
                  <p>From the first second my eyes landed on you outside the church that day, something inside me just knew I had to get closer. You felt like a warmth I needed. I know I was awkward, rambling through my greetings, and when I thought you weren't interested, I brushed it off—but the truth is, you had already left a mark on my heart.</p>
                  
                  <p>For months and years after, seeing you with Mitchell and Kim became my private little comfort. I'd play out entire scenarios in my mind—us laughing, the four of us just hanging out—especially during my quiet walks. I admit, I'm an overthinker, and my shyness told me that this dream was impossible, a beautiful, torturous impossibility.</p>
                  
                  <p><strong>Then, you texted me.</strong></p>

                  <p>That moment—I was speechless. A wave of 'No way, did that just happen?' washed over me! Even when we paused talking for a while, I knew deep down... our story wasn't over. It was only just beginning.</p>

                  <div className="letter-section">
                    <h3>This New Space</h3>
                    <p>I felt seen, truly seen, for the first time in a long time. That text, it wasn't a world-stopping event for everyone else, but to me, it ignited a spark I honestly didn't know I had. I never thought I could feel this way.</p>

                    <p>The fact that you would call me late at night, choosing to spend your quiet, personal time talking to me instead of anything else—it felt like a fortune. Honestly, for a moment, it felt like I was wealthy. Those random photos, the videos, and your voice notes became the highlight reel of my August 2024 holiday. They were the absolute best moments.</p>

                    <p>Then, just when I thought I'd seen all the good things you had to offer, you invited me to your prom. To be honest, I thought you'd have fun, the typical kind of fun that happens at a big party. I imagined the night getting crazy, as it often does for girls who get that chance.</p>

                    <p>But that's where I was completely wrong, in the most wonderful way.</p>

                    <p>You did have fun, yes, but not in the way I expected. You showed me what it means to be seen and to truly matter to someone. You chose to spend the night with me. You were physically in South Africa, celebrating your prom, and I was here in Kenya, yet we had a blast. Correct me if I'm wrong, but I truly believe we had more fun together than most of the people there who were actually standing side-by-side.</p>

                    <p><em>You redefined what "together" means.</em></p>

                    <p>This is more than just a feeling; it's a reality we built across a continent. What is this new, amazing space we've found, where distance just melts away when we talk?</p>
                  </div>

                  <div className="letter-section">
                    <h3>🌹 The Whole Heart: A Chronicle of Love and Faith 🌹</h3>
                    <p>I remember departing for my exams, knowing that you remained here, a constant, beautiful force. You petitioned the heavens for my success, weaving my name into your nightly prayers with a fervor that surpassed those I knew best.</p>
                    <p>Upon the conclusion of that intense chapter, nothing truly mattered except the joy of my good result and, more significantly, the holidays that followed. Seeing you then—so elegant and radiant—filled me with an excitement that made Sundays sacred. They were the one, sure appointment where I could finally see your face and feel the shelter of your embrace 🌹.</p>
                    <p>The subsequent year brought a necessary separation: you had to return to your studies. Though I was physically absent and could not be there to support you, I carry the deep conviction that my prayers traveled with you, providing guidance and protection every step of the way.</p>
                  </div>

                  <div className="letter-section">
                    <h3>A Defining Easter</h3>
                    <p>However, the moments that truly defined this year were the ones we shared, illuminated by your presence. The Easter we spent together is etched in my soul. I had never known such profound peace and comfort radiating from another human being until you. From the instant I sat beside you to the gentle moment we prayed together, I cherished every single breath. All my troubles, all my accumulating stress, dissolved completely—vanquished by the quiet strength of your aura.</p>
                    <p>The precise moment I knew, with absolute certainty, that I desired you by my side for a lifetime was when you offered me the grace of prayer. It may seem insignificant to others, but at that specific, holy juncture, I realized that good souls still exist in this world, and I was blessed to have one placed in my life. Though my words were merely a heartfelt whisper and a mumble , I relished every single second of that connection.</p>
                    <p>My greatest regret remains the following day: I failed to meet you, enduring a soaking rain and an unwelcome encounter, while you were left hungry. To this day, the apology for that failing remains heavy on my heart.</p>
                  </div>

                  <div className="letter-section">
                    <h3>❤️ An Unveiling on the 27th❤️</h3>
                    <p>That day, Thursday, November 27th, 2025, was truly unique—I wish I could invent a new word just to describe the feeling.</p>
                    <p>Your visit, even under the guise of giving me a skincare routine, was incredibly moving. Every single touch we shared, I cherished it deeply. I have never felt such genuine love and care emanating from anywhere other than the bubble we were in.</p>
                    <p>I especially enjoyed making you smile, particularly when I was perfecting that lip gloss application. I completely lost myself in your melting smile and laughter; it wiped away every trace of worry I had.</p>
                    <p>Then you did the unthinkable: you gave me the best embrace I've ever had. I think you saw something on my cheeks that made you decide to plant those light, sweet kisses there.</p>
                    <p>The moment I realized this was truly happening was when you held my face in your hands. I couldn't resist; I just placed my hands on your waist and leaned in for what became the most incredibly romantic moment of my nineteen years.</p>
                    <p>Thank you. Thank you for being the one who made that moment happen.</p>
                    <p>I know we've already shared many great times, but I want to leave room for the even better ones I have a strong feeling are coming soon. Thank you for everything. I truly hope that one day I may be approved by your parents and recognized by your family, just as you have been by mine.</p>
                    <p>I love you ❤️.</p>
                  </div>

                  <p className="letter-salutation">With all my love and endless devotion,<br />{proposerName}</p>
                </div>
                
                <motion.button 
                  className="continue-btn"
                  onClick={() => setCurrentPage('questions')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Continue to the Question 💕
                </motion.button>
              </motion.div>
            </motion.div>
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
                  scale: yesButtonScale
                }}
                whileHover={{ scale: yesButtonScale * 1.05 }}
                whileTap={{ scale: yesButtonScale * 0.98 }}

              >
                Yes! 💕
              </motion.button>
              {noClickCount < 4 && (
                <motion.button
                  className={getNoButtonClass()}
                  onClick={handleNo}
                  animate={{ 
                    scale: noClickCount <= 2 ? Math.max(1 - noClickCount * 0.1, 0.3) : 0.3,
                    opacity: noClickCount >= 4 ? 0 : 1
                  }}
                  whileHover={{ scale: noClickCount <= 2 ? Math.max(1.1 - noClickCount * 0.1, 0.33) : 0.33 }}
                >
                  {getNoButtonText()}
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {currentPage === 'surprise' && (
          <motion.div
            key="surprise"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="page certificate-page"
          >
            <div className="certificate">
              <div className="certificate-border">
                <div className="certificate-content">
                  <div className="certificate-icon">
                    <img 
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUIMrFRAPSNHnv_OyBpdNLYvSUu3LSatAtBA&s" 
                      alt="Love celebration"
                      onError={(e) => {e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text y="60" font-size="40">💕</text></svg>'}}
                    />
                  </div>
                  
                  <h1 className="certificate-title">Congratulations</h1>
                  
                  <div className="certificate-text">
                    <p>to <strong>{proposerName}</strong> and <strong>{proposeeName}</strong></p>
                    <p>on attaining the title of boyfriend and girlfriend</p>
                       <p>and are lucky to be in each other's life</p>
                       <p>and help each other grow spiritually,emotionally,</p>
                       <p>physically and psychologically throughout </p>
                       <p>and be each other's support system.</p>
                       <p>on this day, {new Date().toLocaleDateString()}</p>
                  </div>
                  
                  <div className="signatures">
                    <div className="signature-section">
                      <div className="signature-line">♡ {proposerName} ♡</div>
                      <p className="signature-label">{proposerName}</p>
                      <small>Signature</small>
                    </div>
                    
                    <div className="signature-section">
                      <div className="signature-line">✿ {proposeeName} ✿</div>
                      <p className="signature-label">{proposeeName}</p>
                      <small>Signature</small>
                    </div>
                  </div>
                  
                  <motion.button 
                    className="download-btn"
                    onClick={() => {
                      // Simple screenshot approach
                      window.print();
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Save Certificate 🖨️
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;