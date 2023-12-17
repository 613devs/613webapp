<script lang="ts">
    import svelte from '$lib/images/svelte.svg';
</script>

<main class="">
	<div class="relative mt-[150px] p-2 lg:ml-[133px] flex">
		<!-- Main Tagline -->
		<div class="text-center">
			<h1 class="text-[64px] font-bold text-white lg:w-[710px]">
				Home Page
			</h1>
		</div>
	</div>
	<div
		class="mx-auto max-w-[1500px] flex flex-col items-center mt-[60px] bg-secondary rounded-lg p-10"
	>
		<div class="grid md:grid-cols-3 gap-x-10">
			<!-- Feature-1 -->
			<div class="">
				<img src={svelte} alt="" class="h-[203px] w-[400px] py-2" />
				<h2 class="text-2xl font-bold text-white">thing 1</h2>
				<p class="text-sm text-gray-300">text 1</p>
			</div>
			<!-- Feature-2 -->
			<div>
				<img src={svelte} alt="" class="h-[203px] w-[400px] py-2" />
				<h2 class="text-2xl font-bold text-white">thing 2</h2>
				<p class="text-sm text-gray-300">text 2</p>
			</div>
			<!-- Feature-3 -->
			<div>
				<img src={svelte} alt="" class="h-[200px] w-[400px] py-2" />
				<h2 class="text-2xl font-bold text-white">thing 3</h2>
				<p class="text-sm text-gray-300">text 3</p>
			</div>
		</div>
	</div>
</main>