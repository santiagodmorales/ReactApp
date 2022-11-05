import React from "react";
import { AboutUsCardData } from "./AboutUsCardData";
import Button from '@mui/material/Button';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import "./AboutUsCard.css";

const AboutUsCard = () => {
  return AboutUsCardData.map((item) => (
    <div class="AboutUsCard">
      <div
        class="card-imgbox"
        style={{
          backgroundImage: `url('./images/developers/${item.developer_img}.jpeg')`,
        }}
      ></div>

      <div class="card-text">
        <h2>{item.developer_Name}</h2>
        <h3>Edad:{item.developer_age}</h3>
        <p>{item.description}</p>
        <Button variant="" href={item.social_networks}><LinkedInIcon/>
        </Button>
        
        
       
      </div>
    </div>
  ));
};

export default AboutUsCard;
