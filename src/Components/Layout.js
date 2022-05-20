import React, { useState } from 'react';
import "../Styles/Layout.css";
import logo from '../logo.svg';
import abtme from '../Utility/abtme.png';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import GetAppSharpIcon from '@mui/icons-material/GetAppSharp';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Resume from "../Utility/Resume_Gaurav_Sekhri.pdf";
import EmailIcon from '@mui/icons-material/Email';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { AirportShuttle, EmailOutlined } from '@mui/icons-material';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Snackbar from '@mui/material/Snackbar';

function Layout() {

    const [currentTab, setCurrentTab] = useState(0);

    //Resume Mail Request Email
    const [reqMail, setReqMail] = useState("");

    const [username, setUsername] = useState("");
    const [useremail, setUseremail] = useState("");
    const [usermessage, setUsermessage] = useState("");

    const [srError, setSrError] = useState("");
    const [smError, setSmError] = useState("");

    const [srStep, setSrStep] = useState("");
    const [smStep, setSmStep] = useState("");

    const[showToast, setShowToast] = useState(false);


    var jsProjects = [
        {
            title: "Survey Builder App - For Programmers",
            body: "Created a survey builder application using MERN stack. Aim is to build surveys on low cost.",
            tech: "React, Material UI, Node Js, Express, SQL",
            glink : "",
            personalproject : false
        },
        {
            title: "Survey Client App - For Respondents",
            body: "Created a survey builder application using MERN stack. Aim is to build surveys on low cost.",
            tech: "React, Material UI, Node Js, Express, SQL",
            glink : "",
            personalproject : false
        },
        {
            title: "Whatsapp Clone - Realtime",
            body: "Developed a clone of whatsapp. It can establish a chat environment between two users. Used Pusher for realtime actions.",
            tech: "React, Material UI, Node Js, Express, MongoDb",
            glink : "",
            personalproject : true
        },
        {
            title: "Amazon Cart App - UI, JavaScript",
            body: "Developed a clone of amazon cart. Used HTML, CSS and Javascript to achieve similar UI and functionality.",
            tech: "HTML, CSS, Javascript, Bootstrap",
            glink : "",
            personalproject : true
        },
        {
            title: "Myntra Cart App - UI, JavaScript",
            body: "Developed a clone of myntra cart. Used HTML, CSS and Javascript to achieve similar UI and functionality.",
            tech: "HTML, CSS, Javascript, Bootstrap",
            glink : "",
            personalproject : true
        },
        {
            title: "Analog Clock Using JavaScript",
            body: "Developed a real-time working analog clock using pure JavaScript. Time can be fetched using built-in time object in JavaScript.",
            tech: "HTML, CSS, Javascript",
            glink : "",
            personalproject : true
        },
        {
            title: "Calculator Using JavaScript",
            body: "Developed a real-time working calculator using pure JavaScript. Used built-in eval() function in JavaScript to compute results.",
            tech: "HTML, CSS, Javascript",
            glink : "",
            personalproject : true
        },
        {
            title: "Unlimited Jokes API",
            body: "Developed an app that is able to use API (application programming interface) to fetch unlimited jokes from icanhazdadjoke.com",
            tech: "HTML, CSS, Javascript",
            glink : "",
            personalproject : true
        }
    ]

    var AIProjects = [
        {
            title: "Image Classification using CNN",
            body: "Trained a CNN model using 200 images of car & plane each. The model is able to successively distinguish between them.",
            tech: "Deep Learning, Python",
            glink : "",
            personalproject : true
        },
        {
            title: "Face Detection using OpenCV (Python)",
            body: "Used haarcascade xml file that helps in detecting the faces in any image. It can also detect multiple faces in an image.",
            tech: "OpenCV, Python",
            glink : "",
            personalproject : true
        },
        {
            title: "Bengaluru House Price Prediction (Python)",
            body: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
            tech: "Machine Learning, Python",
            glink : "",
            personalproject : true
        },
        {
            title: "Boston House Price Prediction (Python)",
            body: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
            tech: "Machine Learning, Python",
            glink : "",
            personalproject : true
        },
        {
            title: "Diabetes Analysis and Prediction (Python)",
            body: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
            tech: "Machine Learning, Python",
            glink : "",
            personalproject : true
        },     
        {
            title: "Titanic Survival Prediction (Python)",
            body: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
            tech: "Machine Learning, Python",
            glink : "",
            personalproject : true
        },
    ]

    const[projectsList, setProjectsList] = useState(jsProjects);

    function downloadResume(){
        window.location.href = "http://localhost:3000/src/Utility/Resume_GauravSekhri.pdf";
    }

    function CheckMailFormat(str){
        if( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test( str ) ) {
            return true;
        }
        else{
            return false;
        }
    }

    function SendResumeMail(){
        // axios.post("https://gspf-backend.herokuapp.com/sendmail")
        if(reqMail == 0){
            setSrError("Enter your mail first.");
        }
        else if(!CheckMailFormat(reqMail)){
            setSrError("Enter a valid email.");
        }
        else{
            setSrStep("loading");
            axios.post("https://gspf-backend.herokuapp.com/sendmailresume/" + reqMail)
            .then(response => {
                if(response.data == "sent"){
                    console.log(response.data + " to " + reqMail);
                    setSrStep("sent");
                }
            });
        }
    }

    function SendMessage(){
        var data = {
            name : username,
            email : useremail,
            message : usermessage
        }

        if(username == ""){
            setSmError("Please enter your name.")
        }
        else if(useremail == ""){
            setSmError("Please enter your email.")
        }
        else if(!CheckMailFormat(useremail)){
            setSmError("Enter a valid email.");
        }
        else if(usermessage == ""){
            setSmError("Please enter your message.")
        }
        else{
            setSmStep("loading");
            axios.post("https://gspf-backend.herokuapp.com/sendmailmessage", data)
            .then(response => {
                if(response.data == "sent"){
                    console.log(response.data);
                    setSmStep("sent");
                }
                else{
                    console.log("error")
                }
            });
        }
    }

    function emailcopy(){
        navigator.clipboard.writeText("gauravsekhri69@gmail.com");
        setShowToast(true);
    }

    return (
        <div className='containermain'>

            <div className='part1'>
                <div className='logocontainer'>
                    <img src={logo} className="App-logo" alt="logo" />
                </div>
                <div className='myname'>Gaurav Sekhri</div>
                <div className='coffeebtncontainer'><a href='http://localhost:3000/#contactme' className='coffeebtn'>Coffee with me</a></div>
            </div>

            <div className='part2'>
                <div className='boxescontainer'>
                    <div className='leftbox'>
                    <img src={abtme} className="abtmeimg" alt="logo" />
                    </div>
                    <div className='rightbox'>
                        <div className='abtheader'>About Me</div>
                        <div className='abtText'>
                            Hi I am Gaurav Sekhri, a 23 year old Developer living in New Delhi, India. I am a Computer Science Engineer, currently working at Excavate Research as a Programmer.
                            
                        </div>
                    </div>
                </div>
            </div>

            <div className='part3'>
                <div className='part3header'>Resume</div>
                <div className='resumebtnscont'>
                    <a href={Resume} download="Resume_Gaurav_Sekhri" target='_blank' className='dwnldA'>
                        <button className='downloadresumebtn'><GetAppSharpIcon/> Download Resume</button>
                    </a>
                    <div className='middle'>OR</div>
                    <div className='mailerinput'>
                        {srStep == "" &&
                        <>
                            {srError.length == 0 ? <div className='mailheader'><i>Get it on your mail</i></div> : <div className='srErrorMsg'>{srError}</div>}
                            <input className='emailinput' type="text" placeholder='Enter your email' onChange={(e) => setReqMail(e.target.value)}></input>
                            <div>
                                <button className='sendemailbtn' onClick={() => SendResumeMail()}>Send</button>
                            </div>
                        </>
                        }
                        {srStep == "loading" && 
                            <div className='srloader'>
                                <CircularProgress />
                            </div> 
                        }
                        
                        {srStep == "sent" && <div className='srloader'>Mail Sent ! <br/> Check your Inbox.</div>}
                    </div>
                </div>
            </div>
            <div className='part4'>
                <div className='part4header'>Projects</div>
                <div className='currcategory'>
                    <ul class="nav nav-pills">
                        <li class="nav-item" onClick={() => {setCurrentTab(0); setProjectsList(jsProjects);}}>
                            <a className={currentTab == 0 ? "nav-link active" : "nav-link"}>JavaScript</a>
                        </li>
                        <li class="nav-item" onClick={() => {setCurrentTab(1); setProjectsList(AIProjects);}}>
                            <a className={currentTab == 1 ? "nav-link active" : "nav-link"}>AI/ML</a>
                        </li>
                        {/* <li class="nav-item" onClick={() => setCurrentTab(2)}>
                            <a className={currentTab == 2 ? "nav-link active" : "nav-link"}>Other</a>
                        </li> */}
                    </ul>
                </div>
                <div className='projectscontainer'>
                    {[].map(x => (
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image="/static/images/cards/contemplative-reptile.jpg"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                Lizard
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    ))}


                    <div class="album py-5">
                        <div class="container">
                            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                                {window.screen.width > 800 ? 
                                    <>
                                        {projectsList.map((x,i) => (
                                        <div class="col" key={i}>
                                            <div class="card shadow-sm">
                                                {/* <svg class="bd-placeholder-img card-img-top" width="100%" height="150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em"></text></svg> */}
                                                <div className='cardtitle'>{x.title}</div>
                                                <div class="card-body">
                                                <div class="card-text">{x.body}</div>
                                                <div className='techstack'>Tech : {x.tech}</div>
                                                <div class="">
                                                    <div class="btn-group">
                                                    {/* <Button variant="text">Github</Button> */}
                                                    {/* <Button variant="text">Edit</Button> */}
                                                    {x.personalproject == true ? 
                                                        <a href={x.glink}>Github</a>
                                                        :
                                                        <a>Company Project</a>
                                                    }
                                                    </div>
                                                    <small class="text-muted"></small>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                        ))}
                                        {/* <div class="col">
                                            <div class="loadmorecard">
                                                <div className='loadmore'>{"Load More =>"}</div>
                                            </div>
                                        </div> */}
                                    </>
                                    :
                                    <>
                                        {projectsList.slice(0,4).map((x,i) => (
                                        <div class="col" key={i}>
                                            <div class="card shadow-sm">
                                                {/* <svg class="bd-placeholder-img card-img-top" width="100%" height="150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em"></text></svg> */}
                                                <div className='cardtitle'>{x.title}</div>
                                                <div class="card-body">
                                                <div class="card-text">{x.body}</div>
                                                <div class="d-flex justify-content-between align-items-center">
                                                    <div class="btn-group">
                                                    {/* <Button variant="text">Github</Button> */}
                                                    {/* <Button variant="text">Edit</Button> */}
                                                    <a href={x.glink}>Github</a>
                                                    </div>
                                                    <small class="text-muted"></small>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                        ))}
                                        {/* <div className='loadmore'>{"Load More =>"}</div> */}
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                        

                </div>
            </div>
            <div className='part5' id="contactme">
                <div className='part5header'>Contact Me</div>
                <div className='p5boxxontainer'>
                    <div className='p5leftbox'>
                        <div className='row1'>
                            <a href='https://github.com/gauravsekhri'><GitHubIcon/></a>
                            <a href='https://www.linkedin.com/in/gaurav-sekhri/'><LinkedInIcon/></a>
                        </div>
                        <div className='row2'>
                            {/* <a><EmailIcon/></a> */}
                            <a onClick={() => emailcopy()}><EmailOutlined/></a>
                        </div>
                    </div>
                    <div className='p5rightbox'>
                        {smStep == "" && 
                        <>
                            <input className='contacttext' type="text" placeholder='Name' onChange={(e) => setUsername(e.target.value)}></input>
                            <input className='contacttext' type="email" placeholder='Email' onChange={(e) => setUseremail(e.target.value)}></input>
                            <textarea rows={3} className='contacttext' placeholder='Message' onChange={(e) => setUsermessage(e.target.value)}></textarea>
                            <div className='btnerrRow'>
                                <button className='sendemsgbtn' onClick={() => SendMessage()}>Send</button>
                                <div className='msgError'>{smError}</div>
                            </div>
                        </>
                        }
                        {smStep == "loading" && 
                        <div className='srmailbox'>
                            <div>
                            <CircularProgress /><br/><br/>
                            <>Sending Message...</>
                            </div>
                        </div>}

                        {smStep == "sent" && 
                        <div className='srmailbox'>
                            <div>
                                Sent !! <br/><br/>
                                Thank you for your message.<br/>
                                I will get back to you at the earliest.
                            </div>
                        </div>}

                    </div>
                </div>
            </div>

            <div className='part6'>
                Made with love in MERN by Gaurav Sekhri
            </div>

            <Snackbar
                open={showToast}
                autoHideDuration={1400}
                onClose={() => setShowToast(false)}
                message="Email Copied !!"
                // action={action}
            />
        </div>
    )
}

export default Layout