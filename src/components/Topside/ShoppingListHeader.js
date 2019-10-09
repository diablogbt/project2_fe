import React from 'react';
import { InputText } from 'primereact/inputtext';
import Useravatar from '../UserAvatar/UserAvatar';
import { Button } from 'primereact/button';
import './ShoppingListHeader.css';
import Logo from '../Logo/Logo';


const ShoppingListHeader = (props) => (
    <div className="Headercontainer">
        <div className="Logozone">
            <Logo height="80"></Logo>
        </div>
        <div id="searchzone" className="Searchzone">
        <div className="input-group">
            <InputText className="SearchzoneText"></InputText>
            <Button icon="pi pi-search"></Button>
        </div>
        </div>

        <div id="userzone" className="Userzone">
            <Useravatar height="75" click={props.clickonavatar} />
        </div>
    </div>
);

export default ShoppingListHeader;