import React from 'react';
import {Slider} from 'primereact/slider';
import {Accordion,AccordionTab} from 'primereact/accordion';
import { connect } from 'react-redux'

import './SideTool.css';
import transferImg from '../../assets/image/transfer.png'
import { InputText } from 'primereact/inputtext';
import * as actions from '../../store/actions/Index';

class SideTool extends React.Component{

    state={
        items: {},
        textvalues: [0,0]
    }

    accordionBars = [];

    render(){
        this.state.items=this.props.items;
        this.setSliderInfo();
        return (
            <div className="SideBarPanel" >
                sidebar
                <Accordion multiple={true} >
                    {this.accordionBars}
                </Accordion>
            </div>
        );
    }

    setSliderInfo(){
        this.accordionBars=[];
        for(let key in this.state.items){
            
            let sliders= [];
            for(let key_item in this.state.items[key]){
                let min=this.state.items[key][key_item].min;
                let max=this.state.items[key][key_item].max;
                let value=this.state.items[key][key_item].value;
                sliders.push(
                    <div className="mySliderTitles">
                        <span>
                            {/* <i className="pi pi-sort"></i>   */}
                            <img src={transferImg} alt="transfericon" height="15"/>
                        </span>
                        <span className="mySliderTitles">
                            {this.state.items[key][key_item].title+
                                ((this.state.items[key][key_item].unit)?'('+this.state.items[key][key_item].unit+')':'')
                            }
                        </span>
                    </div>
                    
                );  
                sliders.push(
                <div className="mySliderBox">
                    <div className="mySliderValueLeftBox">
                        <InputText keyfilter="num"
                            value={this.state.items[key][key_item].value[0]}
                            onChange={(event) => this.sliderTextChangeHandler(event,key,key_item,0)}
                            onBlur={(event) => this.sliderTextBlurHandler(event)}
                            className="mySliderTextValues"
                            />
                    </div>
                    <div>
                        <Slider 
                        key={key_item}
                        range={true} 
                        value={value}
                        min={(min)?(min):0}
                        max={max}
                        onChange={event => this.slideValueChangeHandler(event, key, key_item)}
                        onSlideEnd={event => this.slideEndHandler(event,key,key_item)}
                        className="mySlider"
                        ></Slider>
                    </div>
                    
                    <div className="mySliderValueRightBox">
                        <InputText keyfilter="num" 
                            value={this.state.items[key][key_item].value[1]}
                            onChange={(event) => this.sliderTextChangeHandler(event,key,key_item,1)}
                            className="mySliderTextValues"
                            />
                    </div>
                    </div>);
            }
            this.accordionBars.push(<AccordionTab header={key.replace('_',' ')} key={key} 
                contentClassName="myAccordionContent" headerClassName="myAccordionHeader">
                {sliders}
                </AccordionTab>);
        }
    }
    
    slideValueChangeHandler = (event, accid, innerid) => {
        let changedItem = this.state.items[accid][innerid];
        changedItem.value = event.value;
        
        let newItem = {};  
        newItem[accid]={};
        newItem[accid][innerid]=changedItem;
        console.log({items:newItem});
        this.setState({items: newItem});
    }

    slideEndHandler = (event, accid, innerid) => {
        this.props.filterValueChange(event.values, accid, innerid);
    }

    sliderTextChangeHandler = (event, accid, innerid, elementindex) =>{
        console.log('text change:');
        let newevent = {value:this.state.items[accid][innerid].value};
        newevent.value[elementindex]=event.target.value;
        this.slideValueChangeHandler(newevent, accid, innerid);
    }

    sliderTextBlurHandler = (event) =>{
        console.log(event.target.value);
    }
    
}

const mapStateToProps = (state) => ({
    items: state.filter.sideitems,
})

const mapDispatchToProps = dispatch => ({
    filterValueChange: (newvalues, accid, innerid) => actions.filterValueChange(newvalues, accid, innerid)(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(SideTool)

