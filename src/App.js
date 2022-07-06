import { useState } from 'react';
import './App.css';

function App() {
  let [title, setTitle] = useState(['물놀이 장비 추천', '여름 바다 추천', '강남 맛집 추천']);
  let [좋아요, 좋아요변경] = useState([1,1,1]);
  let [modal, setModal] = useState(false);
  let [클릭된목록, 클릭변경] = useState('');
  let [새로운글, 새로운글변경] = useState('');

  return (
    <div className="App">
      <div className='header'>블로그</div>

      <button onClick={()=> {
        let change = [...title];
        change = change.sort();
        setTitle(change)
      }}>가나다순 정렬</button>
      <button onClick={()=> {
        let copy = [...title];
        copy[0] = '물놀이 가지마';
        setTitle(copy);
      }}>수정</button>

      {/* <div className='list'>
        <h3 onClick={()=>{ modal === false? setModal(true) : setModal(false) }}>{title[0]} <span onClick={()=> {좋아요변경(좋아요+1)}}>😍</span>{좋아요}</h3>
        <p>2월 18일 발행</p>
      </div>
      <div className='list'>
        <h3>{title[1]}</h3>
      </div>
      <div className='list'>
        <h3>{title[2]}</h3>
        <p>2월 18일 발행</p>
      </div> */}
      {
        title.map(function(a, i){
          return (
            <>
              <div className='list' onClick={()=> { 클릭변경(title[i]) }}>
                <h3 onClick={()=>{ modal === false? setModal(true) : setModal(false) }}>{title[i]} <span onClick={(e)=> {
                  e.stopPropagation();
                  let likecopy = [...좋아요];
                  likecopy[i] ++;
                  좋아요변경(likecopy);
                }}>💕</span>{좋아요[i]}</h3>
                <p>2월 18일 발행</p>
                <button onClick={()=>{
                  let 삭제 = [...title];
                  삭제.splice(i, 1);
                  setTitle(삭제);
                }}>삭제</button>
              </div>
            </>
          )
        })
      }
      <input onChange={(e) => {새로운글변경(e.target.value)}}/>
      {
        새로운글 == ''? <button onClick={()=>{alert('내용을 입력해주세요')}}>추가</button> : <button onClick={()=> {
          // let 기존글 = title.push(새로운글);
          // 기존글 = 기존글.push(새로운글);
          // setTitle(기존글);
          // console.log(기존글);
          console.log(새로운글);
          let 기존글 = [...title];
          기존글.unshift(새로운글);
          setTitle(기존글);
          localStorage.setItem("기존글", JSON.stringify(새로운글));

          let 좋아요추가 = [...좋아요];
          좋아요추가.unshift(1);
          좋아요변경(좋아요추가)
        }}>추가</button>
      }
      
      <button onClick={()=> {
        let 이전글 = localStorage.getItem("기존글");
        let 기존글 = [...title];
        기존글.unshift(이전글);
        setTitle(기존글);
      }}>불러오기</button>
      
      {
        modal === true ? <Modal title={title} setTitle={setTitle} 클릭된목록={클릭된목록} ></Modal> : null
      }
      
    </div>
  );
}
function Modal (props){
  return(
    <div className="modal">
      <h4>{props.클릭된목록}</h4>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  )
}

export default App;

//응용3. 날짜데이터는?
// state에 글만 저장되어있는데 날짜같은 것도 저장해두고 보여주는 식으로 하면 재밌을 것 같군요. 
// 자바스크립트로 현재 날짜같은 것도 출력해볼 수 있어서 글 발행시 그런 기능을 더해줄 수도 있겠네요.  
