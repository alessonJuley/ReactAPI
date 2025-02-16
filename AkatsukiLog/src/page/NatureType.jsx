import { useState , useEffect } from 'react';

const NatureType = () => {

          const [waterReleaseMembers, setWaterReleaseMembers] = useState([]);


          useEffect(() => {
                    // get all akatsuki data
                    fetch(`https://narutodb.xyz/api/akatsuki`).then((response) => {
                              return response.json();
                    }).then((data) => {

                              // NOTE: check API URL using postman to undestand data you are getting

                              // json data - "akatsuki": [
                              //        {
                              //                  id:...,
                              //                  name: "member 1",
                              //                  "natureType":[...],
                              //        }, ...
                              // ]

                              const akatsukiMembers = data.akatsuki;
                              let waterReleaseUser = [];

                              akatsukiMembers.map((member) => {

                                        // the condition contains && because some members do not have any natureType. Again try to undestand the data you are getting
                                        if(member.natureType && member.natureType.includes("Water Release")){
                                                  
                                                  waterReleaseUser.push(member.name);
                                                  
                                                  setWaterReleaseMembers(waterReleaseUser);
                                        }
                              });
                    }).catch((error) => {
                              console.log("Error: ", error);
                    });
          }, []);

          return(<div className="container">
                    <h1>Members with Water Release Type</h1>
                    <div className="member-info">
                              <ul className="jutsu-list">
                                        {waterReleaseMembers.map((member, index) => {

                                                  return(<li key={index}>
                                                            {member}
                                                  </li>);
                                        })}
                              </ul>

                    </div>
          </div>);
}

export default NatureType;