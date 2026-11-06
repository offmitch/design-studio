
import { useState } from 'react';
import HatViewer from './components/HatViewer';
import './App.css';

function App() {
    const [hatColor, setHatColor] = useState('#222222');

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
                    <HatViewer hatColor={hatColor} />
                </section>

                <aside className="editor">
                    <h2>Customize Your Hat</h2>

                    <div className="editor-section">
                        <h3>Hat Colour</h3>

                        <div className="color-options">
                            {colors.map((color) => (
                                <button
                                    key={color.value}
                                    className={`color-option ${
                                        hatColor === color.value ? 'selected' : ''
                                    }`}
                                    style={{ backgroundColor: color.value }}
                                    onClick={() => setHatColor(color.value)}
                                    title={color.name}
                                />
                            ))}
                        </div>

                        <p>Selected: {colors.find(c => c.value === hatColor)?.name}</p>
                    </div>
                </aside>
            </main>
        </div>
    );
}

export default App;
