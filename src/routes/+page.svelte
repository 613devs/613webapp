<script lang="ts">
	import house1 from '../lib/static/house1.jpg';
	import house2 from '../lib/static/house2.jpg';
	import house3 from '../lib/static/house3.jpg';
</script>

<div class="flex flex-col w-full gap-5 items-center">
	<div>
		<h1 class="font-semibold text-3xl">La Casa de Carne</h1>
	</div>
	<div class="text-center">
		<p class="italic">
			"Life moves pretty fast. If you don't stop and look around once in a while, you could miss it"
		</p>
		<p>- Gandhi</p>
	</div>
	<div class="rounded-box sm:w-1/2">
		<img src={house1} alt="Some boss bitches" />
	</div>
	<div class="rounded-box sm:w-1/2">
		<img src={house2} alt="Some boss bitches" />
	</div>
	<div class="rounded-box sm:w-1/2">
		<img src={house3} alt="Some boss bitches" />
	</div>
</div>
