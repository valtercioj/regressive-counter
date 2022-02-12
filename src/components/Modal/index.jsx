import { React, useState } from 'react'


export default function Modal(){
  const [buttonModal, setButtonModal] = useState(false)
    return (
      
        <div style={buttonModal?{display: "none"}:null}
        className="modal-overlay">
      <div className="modal-container">
    

        <strong>Finalizado</strong>
        <p>O tempo chegou ao Fim.</p>
        <button type="button" onClick={()=>setButtonModal(!buttonModal)}>
          <img src="/icons/close.svg" alt="Fechar Modal"/>
        </button>
      </div>
    </div>
    
    )
}