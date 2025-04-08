import { useEffect } from 'react';

const ChatraChat = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.innerHTML = `
       (function(d, w, c) {
        w.ChatraID = 'PgK7J9qhJL6zAeFcg';
        var s = d.createElement('script');
        w[c] = w[c] || function() {
            (w[c].q = w[c].q || []).push(arguments);
        };
        s.async = true;
        s.src = 'https://call.chatra.io/chatra.js';
        if (d.head) d.head.appendChild(s);
    })(document, window, 'Chatra');
    `;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default ChatraChat;