import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.ElementFocus = React.createRef();
    
  }

  state = { show: false }
  
    showModal = () => {
      
      this.setState({ show: true });
    }
    
    hideModal = () => {
      this.setState({ show: false });
    }
    
    componentDidMount(){
      this.ElementFocus.current.focus();
      

      
    }
    render() {
      
      let props = this.state.show ? { 'aria-hidden': true } : {};
      
      return (
        <section>
          <div id="sectionContent" {...props} >
              <h1 >Dialog - TheMarker</h1>
              <button type='button' onClick={this.showModal}  className="buttonOpen"
                                    ref={this.ElementFocus}
              >Open</button>
          </div>
          <div className="footer">
        <br/>
        <br/>
        <h5>&copy; Made By Norel Kedar - 2018 </h5>
        </div>
          {this.state.show && <div id="dialogPlaceholder">
               <div className='overlay'></div>
             <Dialog handleClose={this.hideModal} ref={this.ElementFocus} >
               <div className="dialogIn" role="document">
                 <p>Dialog Title</p>
                 <p>ILS Currency</p>
                 <div>Enter amount:</div><br/>
                 <input id="firstTabIndex" tabIndex="1" ref={this.firstInput}/>
                 <div>Enter currency: </div><br/>
                 <input tabIndex="2" />
              </div>
             </Dialog>
          </div>}
          
        </section>
      )
    }
  }
  
  
  class Dialog extends React.Component {
  
    constructor(props){
      super(props);
      this.handleClose = props.handleClose.bind(this);
      this.children = props.children;
      this.state = {currentKey: '',
                    currentTabIndex: ''}
      this.handleKeyPress = this.handleKeyPress.bind(this);
      this.handleTabPress = this.handleTabPress.bind(this);
      this.handleClickonOut = this.handleClickonOut.bind(this);
      //Forward ref
      React.forwardRef((props, ref) => (ref={ref})
        
      );


    }
    //Handle ESC key to exit the Dialog
    handleKeyPress(e) {
      this.setState({currentKey: e.keyCode});
      if(e.keyCode === 27) {
        this.handleClose(true);
        
      }
    }

    handleTabPress(e) {


      this.setState({currentTabIndex: e.keyCode});
      let first = document.getElementById('firstTabIndex');
      if(e.keyCode === 9 && e.target.tabIndex === 3) {
        first.focus();
        
      }
    }
    
    //Handle click outside dialog
    handleClickonOut(e) {
        this.handleClose(true);
      }

    //Handle click Inside dialog
      handleClickonInner(event) {
        event.stopPropagation();
        }
      
    

    
    componentDidMount(){
      
      // select the <div role="document">
      // let dialogChildren = React.Children.map(this.props.children, (child, i) => { return child; });
      // select children of <div role="document">
      // assume we have only one child under the <dialog>, and the grandchildren are one level below
      // let elements = React.Children.map(dialogChildren[0].props.children, (child1, i) => { return child1; });
    }
    
    componentWillMount() {
      document.addEventListener('click', this.handleClick);
      document.addEventListener('keydown', this.handleKeyPress);
      document.addEventListener('keydown', this.handleTabPress);




    }

    componentWillUnmount() {
      document.removeEventListener('keydown', this.handleKeyPress);
      document.removeEventListener('click', this.handleClick);
      document.removeEventListener('keydown', this.handleTabPress);

    }

    
    render(){
  
      return (
        <div className='modal' onClick={this.handleClickonOut}>
          <section className='modal-main' onClick={this.handleClickonInner}>
            {this.children}
            <button
              onClick={this.handleClose}
              className="buttonClose"
              ref={this.lastInput}
              tabIndex="3"
              id="lastTabIndex"
              
            >
              Close
            </button>
          </section>
        </div>
      );
    }
  };


export default App;
