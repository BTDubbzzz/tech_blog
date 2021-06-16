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

if (document.querySelector('.new-post-form')) {
	document
		.querySelector('.new-post-form')
		.addEventListener('submit', newFormHandler);
}
document
	.querySelector('.post-list')
	.addEventListener('click', delButtonHandler);
