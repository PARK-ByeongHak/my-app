import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function Header(props){
  console.log('props', props, props.title);
  return <header>
    <h1><a href="/" onClick={(event)=>{
      event.preventDefault();                                                                     // a태그 작동 안하게 설정
      props.onChangeMode();
    }}>{props.title}</a></h1>
  </header>
}
function Nav(props){
  const lis = []
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/'+t.id} onClick={(event)=>{
      event.preventDefault();                                                                      // a태그 작동 안하게 설정
      props.onChangeMode(Number(event.target.id));
    }}>{t.title}</a>
    </li>);
  }
  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}
function Article(props){
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}
function Create(props){
  return <article>
    <h2>Create</h2>
    <form onSubmit={event=>{
      event.preventDefault();                                                                      // a태그 작동 안하게 설정
      const title = event.target.title.value;
      const body = event.target.body.value;                                                        // 변수 선언 후 이벤트/타겟/대상/값 의 형식으로 가져옴
      props.onCreate(title, body);
    }}>
      <p><input type="text" name="title" placeholder="title"/></p>
      <p><textarea name="body" placeholder="body"></textarea></p>
      <p><input type="submit" value="Create"></input></p>
    </form>
  </article>
}
function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {id:1,title:'html', body:'html is ...'},
    {id:2,title:'css', body:'css is ...'},
    {id:3,title:'javascript', body:'javascript is ...'}                                             // 
  ]);
  let content = null;                                                                               // 변수 선언
  if(mode === 'WELCOME'){
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if(mode === 'READ'){
    let title, body = null;                                                                         // 변수 선언
    for(let i=0; i<topics.length; i++){
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
  } else if(mode === 'CREATE'){
    content = <Create onCreate={(_title, _body)=>{
      const newTopic = {id:nextId, title:_title, body:_body}
      const newTopics = [...topics]
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);
    }}></Create>
  }
  return (
    <div>
      <Header title="WEB" onChangeMode={()=>{
        setMode('WELCOME');                                                                         // WELCOME 모드로 설정
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
        setMode('READ');                                                                            // READ 모드로 설정
        setId(_id);
      }}></Nav>
      {content}
      <a href="/create" onClick={event=>{
        event.preventDefault();                                                                     // a태그 작동 안하게 설정
        setMode('CREATE');                                                                          // CREATE 모드로 설정
      }}>Create</a>
    </div>
  );
}

export default App;
