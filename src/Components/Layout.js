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
import Resume from "../Utility/Resume_GauravSekhri.pdf";
import EmailIcon from '@mui/icons-material/Email';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { EmailOutlined } from '@mui/icons-material';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Snackbar from '@mui/material/Snackbar';

function Layout() {

    const [currentTab, setCurrentTab] = useState(1);

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
            title: "Survey Builder App",
            body: "Created a survey builder application using MERN stack. Aim is to build surveys on low cost."
        },
        {
            title: "Realtime Whatsapp Clone",
            body: "Developed the cart app for Whatsapp."
        },
        {
            title: "Amazon Cart App",
            body: "Developed the cart app for Amazon."
        },
        {
            title: "Myntra Cart App",
            body: "Developed the cart app for Myntra."
        },
        {
            title: "Myntra Cart App",
            body: "Developed the cart app for Myntra."
        }
    ]

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
            axios.post("http://localhost:9000/sendmailresume/" + reqMail)
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
            axios.post("http://localhost:9000/sendmailmessage", data)
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
                            Hi I am Gaurav Sekhri, a 23 year old Developer living in New Delhi, India. I am a Computer Science Engineer, currently working at Excavate Research.
                            
                        </div>
                    </div>
                </div>
            </div>

            <div className='part3'>
                <div className='part3header'>Resume</div>
                <div className='resumebtnscont'>
                    <a href={Resume} download="MyExampleDoc" target='_blank' className='dwnldA'>
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
                        <li class="nav-item" onClick={() => setCurrentTab(0)}>
                            <a className={currentTab == 0 ? "nav-link active" : "nav-link"}>JavaScript</a>
                        </li>
                        <li class="nav-item" onClick={() => setCurrentTab(1)}>
                            <a className={currentTab == 1 ? "nav-link active" : "nav-link"}>AI/ML</a>
                        </li>
                        <li class="nav-item" onClick={() => setCurrentTab(2)}>
                            <a className={currentTab == 2 ? "nav-link active" : "nav-link"}>Other</a>
                        </li>
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
                                {jsProjects.map((x,i) => (
                                <div class="col" key={i}>
                                    <div class="card shadow-sm">
                                        {/* <svg class="bd-placeholder-img card-img-top" width="100%" height="150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em"></text></svg> */}
                                        <div className='cardtitle'>{x.title}</div>
                                        <div class="card-body">
                                        <p class="card-text">{x.body}</p>
                                        <div class="d-flex justify-content-between align-items-center">
                                            <div class="btn-group">
                                            <Button variant="text">Text</Button>
                                            <Button variant="text">Edit</Button>
                                            </div>
                                            <small class="text-muted"></small>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                ))}
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