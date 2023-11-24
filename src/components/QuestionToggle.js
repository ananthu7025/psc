import React, { useState } from 'react';

const QuestionTextWithToggle = ({ text, maxLength }) => {
    
    const [expanded, setExpanded] = useState(false);
    const truncatedText = expanded ? text : text.slice(0, maxLength);

    return (
        <div>
            <p style={{ overflowWrap: 'break-word' }}>{truncatedText}</p>
            {text.length > maxLength && (
                <span
                    style={{ cursor: 'pointer', color: 'blue', fontSize: "10px" }}
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? ' Show less' : ' Show more'}
                </span>
            )}
        </div>
    );
};

export default QuestionTextWithToggle;
