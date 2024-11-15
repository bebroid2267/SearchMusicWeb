import { useState } from "react";
import BackgroundVideo from "../customComponents/backVideo";
import MainPanel from "../customComponents/mainPanel";
import { useNavigate } from "react-router-dom";
import '../../../wwwroot/css/result.css'
import '../../../wwwroot/css/site.css'

export default function MainPage({ onChange }: any) {
    const [queary, setQueary] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: any) => {
      e.preventDefault();
      console.log('bebra');
      if (!queary.trim()) {
        alert("Введите запрос емае");
        return;
      }

      try {
        const response = await fetch('https://localhost:44303/Home/SearchTracks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ Queary: queary})
        });
  
        const data = await response.json();
        console.log(data);
        onChange(data);
        navigate("/Result");
        
      } catch(error) {
        console.error(error);
      }
    }  

    return (
        <div className='intro'>
        <BackgroundVideo />
        <MainPanel />
        <div className='intro__content'>
            <h1>Найти трек. Легко.</h1>
            <form onSubmit={handleSubmit}>
                <input 
                  className="text_queary" 
                  name="Queary" 
                  id="input_queary" 
                  placeholder="Ник артиста или название трека"
                  value={queary}
                  onChange={(e) => setQueary(e.target.value)} 
                />
                    <button 
                      type="submit" 
                      className="btn_queary" 
                      id="btn_queary" 
                      style={{
                        backgroundImage: "url('../src/resources/yalogo.svg')", 
                        backgroundSize: 'cover', 
                        animation: 'pulse 1.5s infinite'
                        }}>
                    </button>
            </form>
        </div>
    </div>
    );
}