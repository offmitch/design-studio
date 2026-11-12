
import { useState } from 'react';
import HatViewer from './components/HatViewer';
import './App.css';

function App() {
    const [hatColor, setHatColor] = useState('#222222');
    const [hatText, setHatText] = useState('Your Text');
    const [textColor, setTextColor] = useState('#ffffff');

    const colors = [
        { name: 'Black', value: '#222222' },
        { name: 'White', value: '#f5f5f5' },
        { name: 'Red', value: '#c0392b' },
        { name: 'Blue', value: '#2471a3' },
        { name: 'Green', value: '#287a49' },
        { name: 'Beige', value: '#c9b28b' }
    ];

    return (
        <div className="app">
            <header className="header">
                <h1>Hat Studio</h1>
            </header>

            <main className="workspace">
                <section className="preview">
                    <HatViewer hatColor={hatColor} hatText={hatText} textColor={textColor} />
                </section>

                <aside className="editor">
                    <h2>Customize Your Hat</h2>

                    <div className="editor-section">
                        <h3>Hat Colour</h3>

                        <div className="color-options">
                            {colors.map((color) => (
                                <button
                                    key={color.value}
                                    className={`color-option ${hatColor === color.value ? 'selected' : ''
                                        }`}
                                    style={{ backgroundColor: color.value }}
                                    onClick={() => setHatColor(color.value)}
                                    title={color.name}
                                />
                            ))}
                        </div>

                        <p>Selected: {colors.find(c => c.value === hatColor)?.name}</p>
                    </div>
                    <div className="editor-section">
                        <h3>Custom Text</h3>

                        <input
                            type="text"
                            value={hatText}
                            onChange={(e) => setHatText(e.target.value)}
                            placeholder="Enter your text"
                            maxLength={15}
                        />

                        <h3>Text Colour</h3>

                        <div className="color-options">
                            <button
                                className={`color-option ${textColor === '#ffffff' ? 'selected' : ''
                                    }`}
                                style={{ backgroundColor: '#ffffff' }}
                                onClick={() => setTextColor('#ffffff')}
                            />

                            <button
                                className={`color-option ${textColor === '#222222' ? 'selected' : ''
                                    }`}
                                style={{ backgroundColor: '#222222' }}
                                onClick={() => setTextColor('#222222')}
                            />

                            <button
                                className={`color-option ${textColor === '#c0392b' ? 'selected' : ''
                                    }`}
                                style={{ backgroundColor: '#c0392b' }}
                                onClick={() => setTextColor('#c0392b')}
                            />
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
}

export default App;
