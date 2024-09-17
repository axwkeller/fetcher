<script lang="ts">
	import Api from '$lib/utils/Api';
	import { z } from 'zod';
	import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { superForm, defaults } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { goto } from '$app/navigation';

	const loginSchema = z.object({
		name: z.string().min(1, 'Name is required'),
		email: z.string().email('A valid email is required')
	});

	type LoginParams = z.infer<typeof loginSchema>;

	const form = superForm<LoginParams>(defaults(zod(loginSchema)), {
		validators: zod(loginSchema),
		SPA: true,
		onUpdate: async ({ form }) => {
			if (form.valid) {
				try {
					const response = await Api.login(form.data);
					if (response.ok) {
						goto('/fetch');
					} else {
						console.error('Login failed');
						return {
							message: 'Login failed. Please try again.'
						};
					}
				} catch (error) {
					console.error(error);
					return {
						message: 'An error occurred. Please try again later.'
					};
				}
			}
		}
	});

	const { form: formData, enhance, constraints, submitting } = form;
</script>

<div class="flex min-h-screen items-center justify-center">
	<div class="w-full max-w-md p-6">
		<Card.Root class="w-full">
			<Card.Header>
				<Card.Title class="text-center">Login to Fetch a pet!</Card.Title>
			</Card.Header>
			<Card.Content>
				<form method="POST" use:enhance class="space-y-4">
					<Form.Field {form} name="name">
						<Form.Control let:attrs>
							<Form.Label>Name</Form.Label>
							<Input {...attrs} {...$constraints.name} type="text" bind:value={$formData.name} />
							<Form.FieldErrors />
						</Form.Control>
					</Form.Field>
					<Form.Field {form} name="email">
						<Form.Control let:attrs>
							<Form.Label>Email</Form.Label>
							<Input {...attrs} {...$constraints.email} type="email" bind:value={$formData.email} />
							<Form.FieldErrors />
						</Form.Control>
					</Form.Field>
					<Form.Button disabled={$submitting} class="w-full">
						{$submitting ? 'Logging In...' : 'Login'}
					</Form.Button>
				</form>
			</Card.Content>
		</Card.Root>
	</div>
</div>
