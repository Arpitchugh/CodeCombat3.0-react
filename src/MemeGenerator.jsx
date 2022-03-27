import React, { Component } from 'react';
import './meme.css'

class MemeGenerator extends React.Component {
	state = {
		text: '',
		allMemeImages: [],
		randomImg: '',
	};

	componentDidMount() {
		// Fetching data from the API
		fetch('https://api.imgflip.com/get_memes')
			// Converting the promise received into JSON
			.then(response => response.json())
			.then(content =>
				// Updating state variables
				this.setState({
					allMemeImages: content.data.memes,
				})
			);
	}

	// Method to change the value of input fields
	handleChange = event => {
		// Destructuring the event. target object
		const { name, value } = event.target;

		// Updating the state variable
		this.setState({
			[name]: value,
		});
	};

	// Method to submit from and create meme
	handleSubmit = event => {
		event.preventDefault();
		const { allMemeImages } = this.state;
		const rand =
			allMemeImages[Math.floor(Math.random() * allMemeImages.length)].url;
		this.setState({
			randomImg: rand,
		});
	};
  
	render() {
		return (
			<div>

				<form className='meme' onSubmit={this.handleSubmit}>
					<input
						placeholder='Enter Text'
						type='text'
						value={this.state.text}
						name='text'
						onChange={this.handleChange}
					/>
					<button>Generate</button>
				</form>
				<br />
				<div className='meme'>
					{this.state.randomImg === '' ? (
						''
					) : (
						<img src={this.state.randomImg} alt='meme' />
					)}
					{this.state.randomImg === '' ? (
						''
					) : (
						<h2 className='top'>{this.state.text}</h2>
					)}
					
				</div>
			</div>
		);
	}
}
export default MemeGenerator;
