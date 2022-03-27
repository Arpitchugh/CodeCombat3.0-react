import React, { Component } from 'react';
import './meme.css';

class MemeGenerator extends React.Component {
	state = {
		text: '',
		allMemeImages: [],
		randomImg: '',
		pos: '',
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
						onChange={e => {
							this.setState({
								text: e.target.value,
							});
						}}
					/>
					<input
						placeholder='top/bottom'
						type='text'
						value={this.state.pos}
						name='position'
						onChange={e => {
							this.setState({
								pos: e.target.value,
							});
						}}
					/>
					<button>Generate</button>
				</form>
				<br />
				{this.state.pos === 'top' ? (
					<div className='meme'>
						{this.state.randomImg === '' ? '' : <h2>{this.state.text}</h2>}
						{this.state.randomImg === '' ? (
							''
						) : (
							<img src={this.state.randomImg} alt='meme' />
						)}
					</div>
				) : (
					<div className='meme'>
						{this.state.randomImg === '' ? (
							''
						) : (
							<img src={this.state.randomImg} alt='meme' />
						)}
						{this.state.randomImg === '' ? '' : <h2>{this.state.text}</h2>}
					</div>
				)}
			</div>
		);
	}
}

export default MemeGenerator;
