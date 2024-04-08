import React, { useEffect, useRef, useState } from 'react';
import { FaTwitter as TwitterIcon } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { getQuote } from './features/quote/quoteSlice';

function App() {
    const { author, quote, isLoading } = useSelector((state: any) => state.quote);
    const dispatch = useDispatch<any>();
    const isMounted = useRef(false);

    const [count, setCount] = useState(0);
    const colors = ["DodgerBlue", "green", "blueviolet", "Coral", "pink"];

    useEffect(() => {
        dispatch(getQuote())
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (isMounted.current) {
            document.documentElement.style.setProperty('--color', colors[count]);
            ((count + 1) < colors.length) ? setCount(count + 1) : setCount(0);
        }
        else {
            isMounted.current = true;
        }
        // eslint-disable-next-line
    }, [quote]);

    if (isLoading) {
        return (
            <div id="page-wrapper">
                <div id="quote-box">
                    <div id="quote"><p>Loading...</p></div>
                    <div id="author"></div>
                    <div id="buttons">
                        <button id="new-quote" onClick={() => dispatch(getQuote())}>New Quote</button>
                        <a id="tweet-quote"
                            target="_top"
                            href={`https://twitter.com/intent/tweet?text="${quote}"%20-%20${author}`}><TwitterIcon /></a>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div id="page-wrapper">
            <div id="quote-box">
                <div id="quote">{(quote) ? <p>"{ quote }"</p> : <p>Empty</p> }</div>
                <div id="author">{(author) ? <p>- {author}</p> : <p>Empty</p>}</div>

                <div id="buttons">
                    <button id="new-quote" onClick={() => dispatch(getQuote()) }>New Quote</button>
                    <a id="tweet-quote"
                        target="_top"
                        href={`https://twitter.com/intent/tweet?text="${quote}"%20-%20${author}`}>
                        <TwitterIcon />
                    </a>
                </div>
            </div>
            
        </div>
    );
}

export default App;