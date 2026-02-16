import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, User, Bot } from 'lucide-react';

const Chatbox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hello! I'm your Idea Assistant. How can I help you today?", isBot: true }
    ]);
    const [inputValue, setInputValue] = useState('');

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const newMessages = [...messages, { text: inputValue, isBot: false }];
        setMessages(newMessages);
        setInputValue('');

        // Simulate bot response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                text: "That's a fascinating idea! Let's explore that further. I'm currently in a demo mode, but I can already see the potential.",
                isBot: true
            }]);
        }, 1000);
    };

    return (
        <>
            {/* Floating Trigger */}
            <motion.button
                className="chat-trigger glass"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    right: '30px',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 1000,
                    color: 'var(--text-primary)',
                    boxShadow: 'var(--shadow-glow)'
                }}
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.5, originX: 1, originY: 1 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.5 }}
                        className="chat-window glass"
                        style={{
                            position: 'fixed',
                            bottom: '100px',
                            right: '30px',
                            width: '350px',
                            height: '500px',
                            zIndex: 1000,
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden'
                        }}
                    >
                        <div className="chat-header" style={{ padding: '20px', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Bot size={20} className="glow-text" />
                            <h3 style={{ fontSize: '1.1rem' }}>Idea Assistant</h3>
                        </div>

                        <div className="chat-messages" style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        alignSelf: msg.isBot ? 'flex-start' : 'flex-end',
                                        maxWidth: '80%',
                                        padding: '12px 16px',
                                        borderRadius: msg.isBot ? '4px 16px 16px 16px' : '16px 16px 4px 16px',
                                        background: msg.isBot ? 'var(--glass-border)' : 'var(--accent-primary)',
                                        fontSize: '0.9rem',
                                        lineHeight: '1.4'
                                    }}
                                >
                                    {msg.text}
                                </div>
                            ))}
                        </div>

                        <div className="chat-input" style={{ padding: '20px', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '10px' }}>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type your idea..."
                                style={{
                                    flex: 1,
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'white',
                                    outline: 'none',
                                    fontSize: '0.9rem'
                                }}
                            />
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleSend}
                                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--accent-secondary)' }}
                            >
                                <Send size={20} />
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbox;
