const newFormHandler = async (event) => {
	event.preventDefault();

	const header = document.querySelector('#post-header').value.trim();
	const body = document.querySelector('#post-body').value.trim();

	if (header && body) {
		const response = await fetch(`/api/posts`, {
			method: 'POST',
			body: JSON.stringify({ header, body }),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (response.ok) {
			document.location.replace('/dashboard');
		} else {
			alert('Failed to create post');
		}
	}
};

const newCommentHandler = async (event) => {
	event.preventDefault();

	const body = document.querySelector('#comment-body').value.trim();
	const post_id = event.target.getAttribute('data-post-id');

	if (body && post_id) {
		const response = await fetch(`/api/comments`, {
			method: 'POST',
			body: JSON.stringify({ body, post_id }),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (response.ok) {
			console.log('test');
			document.location.reload();
		} else {
			alert(response.statusText);
			alert('Failed to create comment');
		}
	}
};

const delButtonHandler = async (event) => {
	if (event.target.hasAttribute('data-id')) {
		const id = event.target.getAttribute('data-id');

		const response = await fetch(`/api/posts/${id}`, {
			method: 'DELETE',
		});

		if (response.ok) {
			document.location.replace('/dashboard');
		} else {
			alert('Failed to delete project');
		}
	}
};
const updateButtonHandler = async (event) => {
	event.preventDefault();

	const header = document.querySelector('#post-header').value.trim();
	const body = document.querySelector('#post-body').value.trim();
	const id = event.target.getAttribute('data-post-id');

	const response = await fetch(`/api/posts/${id}`, {
		method: 'PUT',
		body: JSON.stringify({ header, body }),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (response.ok) {
		document.location.replace(`/post/${id}`);
	} else {
		alert('Failed to delete project');
	}
};

if (document.querySelector('.new-post-form')) {
	document
		.querySelector('.new-post-form')
		.addEventListener('submit', newFormHandler);
}

if (document.querySelector('.post-list')) {
	document
		.querySelector('.post-list')
		.addEventListener('click', delButtonHandler);
}
if (document.querySelector('#del-button')) {
	document
		.querySelector('#del-button')
		.addEventListener('click', delButtonHandler);
}
if (document.querySelector('.update-post-form')) {
	document
		.querySelector('.update-post-form')
		.addEventListener('submit', updateButtonHandler);
}

if (document.querySelector('.new-comment-form')) {
	document
		.querySelector('.new-comment-form')
		.addEventListener('submit', newCommentHandler);
}
