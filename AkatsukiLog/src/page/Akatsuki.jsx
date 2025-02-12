import { useState } from 'react';
import defaultImage from '../assets/defaultImage.jpg';

const Akatsuki = () => {

          const [member, setMember] = useState("");
          const [memberName, setMemberName] = useState([]);
          const [memberImage, setMemberImage] = useState([]);
          const [memberJutsu, setMemberJutsu] = useState([]);

          const handleSearch = (event) => {
                    // prevent refresh when form is getting submitted
                    event.preventDefault();

                    console.log("Member: ", member);
                    var searchedMember = "";

                    if(member.includes("")){
                              // format input to replace empty space as $20
                              searchedMember = member.replace(" ", "%20");
                              console.log("searchedMember", searchedMember);
                    }
                    else if(member === " "){
                              alert("Please search a member");
                    }
                    

                    fetch(`https://narutodb.xyz/api/akatsuki/search?name=${searchedMember}`).then((response) => {
                              return response.json();
                    }).then((data) => {
                              const nameTaken = data.name;
                              const imageTaken = data.images;
                              const jutsuTaken = data.jutsu;

                              setMemberName(nameTaken);
                              setMemberImage(imageTaken);
                              setMemberJutsu(jutsuTaken);
                    }).catch((event) => {
                              console.log(event);
                              setMemberName("Member does not exist.");
                              setMemberImage("");
                              setMemberJutsu("");
                    });
          }

          return(
                    <div className="container">
                              <h1>Welcome to Akatsuki Link!</h1>
                              <div className="search-container">
                                        <form id="search-member" onSubmit={(event) => handleSearch(event)}>
                                                  <input type="text" 
                                                            id="akatsuki-member" 
                                                            placeholder="Search member's full name..."
                                                            onChange={(event) => setMember(event.target.value)}/>
                                        </form>
                                        <button form="search-member">
                                                  Search
                                        </button>
                              </div>
                              <div className="member-info">
                                        <h2>{memberName}</h2>
                                        <img src={memberImage} alt="Akatsuki member" />
                                        <p>{memberJutsu}</p>
                              </div>
                    </div>
          );
}

export default Akatsuki;