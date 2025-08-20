import { useState } from "react";
export function Coments() {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Vardenis Pavardenis",
      content: "Labai geras skelbimas! Aš domiuosi šiuo pasiūlymu.",
      timestamp: "2023-05-15 14:30",
      likes: 3
    },
    {
      id: 2,
      author: "Kitas Vartotojas",
      content: "Kokia kaina? Ar galima suderėti?",
      timestamp: "2023-05-16 09:15",
      likes: 1
    }
  ]);


    
    return (
        <>
        <form className="comment-form">
          <h4>Palikite komentarą</h4>
           <div className="form-group">
            <input  type="text"placeholder="Jūsų vardas"required/>
           </div>
             <div className="form-group"> <textarea
            placeholder="Jūsų komentaras..."  required/>
        </div>
        <button type="submit">Paskelbti komentarą</button>
      </form>
  
                </>
    )
}