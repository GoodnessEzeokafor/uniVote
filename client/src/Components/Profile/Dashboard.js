import React, { Component } from 'react';
import '../../css/profile.css'


// const ImgUpload =({
//     onChange,
//     src
//   })=>
//     <label htmlFor="photo-upload" className="custom-file-upload fas">
//       <div className="Profileimg-wrap Profileimg-upload" >
//         <img for="photo-upload" src={src}/>
//       </div>
//       <input id="photo-upload" type="file" onChange={onChange}/> 
//     </label>
  
  
  const Name =({
    onChange,
    value,
    emailTo
  })=>
    <div className="Profilefield">
      <label htmlFor="name">
        Email:
      </label>
      <input 
        id="name" 
        type="text" 
        onChange={onChange} 
        maxLength="25" 
        value={value} 
        placeholder={emailTo} 
        required/>
    </div>
  
    
  const Status =({
    onChange,
    value, 
    account
  })=>
    <div className="Profilefield">
      <label htmlFor="status">
        Address:
      </label>
      <input 
        id="status" 
        type="text" 
        onChange={onChange} 
        maxLength="35" 
        value={value} 
        placeholder={account} 
        required/>
    </div>
  
  
  const Profile =({
    onSubmit,
    src,
    name,
    status,
  })=>
    <div className="profilecard">
      <form className="ProfileForm" onSubmit={onSubmit}>
        <h1>My Profile</h1>
        <label className="custom-file-upload fas">
          <div className="Profileimg-wrap" >
            <img for="photo-upload" src={src}/>
          </div>
        </label>
        <div className="Profilename">{name}</div>
        <div className="Profilestatus">{status}</div>
        {/* <button type="submit" className="Profileedit">Edit Profile </button> */}
      </form>
    </div>
       
        
  const Edit =({
    onSubmit,
    children,
  })=>
    <div className="profilecard">
      <form className="ProfileForm" onSubmit={onSubmit}>
        <h1>My Profile</h1>
          {children}
        {/* <button type="submit" className="Profilesave">Save </button> */}
      </form>
    </div>

export default class CardProfile extends React.Component {
    state = {
      file: '',
      imagePreviewUrl: 'https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true',
      name:'',
      status:'',
      active: 'edit'
    }
  
    // photoUpload = e =>{
    //   e.preventDefault();
    //   const reader = new FileReader();
    //   const file = e.target.files[0];
    //   reader.onloadend = () => {
    //     this.setState({
    //       file: file,
    //       imagePreviewUrl: reader.result
    //     });
    //   }
    //   reader.readAsDataURL(file);
    // }
    editName = e =>{
      const name = e.target.value;
      this.setState({
        name,
      });
    }
    
    editStatus = e => {
      const status = e.target.value;
      this.setState({
        status,
      });
    }
    
    handleSubmit= e =>{
      e.preventDefault();
      let activeP = this.state.active === 'edit' ? 'profile' : 'edit';
      this.setState({
        active: activeP,
      })
    }
    constructor(props){
        super(props)
    }
    
    render() {
        
      const {imagePreviewUrl, 
             name, 
             status, 
             active} = this.state;
      return (
          
        <div className ="ProfileBody" >
            
            
          {(active === 'edit')?(
            <Edit onSubmit={this.handleSubmit}>
              {/* <ImgUpload onChange={this.photoUpload} src={imagePreviewUrl}/> */}
              <Name emailTo ={this.props.email}    onChange={this.editName} value={name}/>
              <Status onChange={this.editStatus} account ={this.props.account}  value={status}/>
            </Edit>
          ):(
            <Profile 
              onSubmit={this.handleSubmit} 
              src={imagePreviewUrl} 
              name={name} 
              status={status}/>)}
          
        </div>
      )
    }
  }
  