import React, { useState, useEffect } from 'react';
import { supabase } from './api/key';


function App() {
  const[gnblist, setGnblist] = useState([]);
  const[gnbview, setView] = useState("글보기 내용이 없습니다")
  const boardtype = ['list', 'view', 'modify', 'delet']; //페이지핸들링변수
  const [pagestatue, pageSet] = useState(boardtype[0]); //라우터없이 하나 컴포넌트에서 page상태에 따라 노출

  const apilist = async () => {
    // supabase  db접속정보를 가지고 서버에 접속하고
    // 데이터가 많으면 order와 limit 메서드로 끊어가지고 오기
  let { data: items, error } = await supabase.from('menu').select('*').limit(50);

    console.log(items, Array.isArray(items))

    if (error) {
      console.error('Error fetching data:', error);
    } else {
      setGnblist(items); // Set the data only if there's no error
    }

   // .from('your_table_name').select('*') // 데이블을 선택하고 sql select 실행
   // 이후 변수에 구조할당함  
   // await supabase.from('navidb').select('*') 이 처리로 만들어진 결과는 object이고
   // 그 내부안의 key이름 data와 error를 items라는 변수에 error는 error라는 변수에 저장
   // 이것이 구조할당
   // data, error라는 변수는 오타내며 안됨
  }
 
 

  //map연동되는 변수가 바로 api변수

  useEffect(()=>{
    return()=>{
      apilist();
    }
    //return아래, 여기에 개발코드 넣으면 완전 오리지널 초보
  }, [])
  return (
    <div className="App">
      <div className='writepage'>
        <h1>글쓰기(pk없음)&글수정(pk반드시 존재)</h1>
      </div>
      <div className='listpage'>
        <h1>목록페이지 total: {gnblist.length}</h1>
        {
          gnblist.length > 0 ? 
          <ul>
            {
              gnblist.map((v, i)=>{
                return(
                  <li key={v.wr_id}>
                    <p onClick={()=>{setView(v.gnblink)}}>
                    {v.gnbnm}
                    </p> 
                    <button>수정</button><button>삭제</button>
                  </li>
                 

                )
              })
            }
          </ul>
          : <div> 로딩화면 제작해줘 </div>
        }
      </div>
      <div className='viewpage'>
        <h1>글보기(pk반드시 존재)</h1>
        <div>
          {
            gnbview
          }
        </div>
      </div>
      <div className='deletpage'>
        <h1>글삭제(pk반드시 존재)</h1>
      </div>
    </div>
  );
}

export default App;
