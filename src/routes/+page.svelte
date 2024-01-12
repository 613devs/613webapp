<script lang="ts">
	import house from '../lib/static/house.jpg';
	import notice from '../lib/static/notice.jpg';
</script>

<div class="flex flex-col w-full gap-5 items-center">
	<div>
		<h1 class="font-semibold text-3xl">La Casa de Carne</h1>
	</div>
	<div class="rounded-box sm:w-1/2">
		<img src={house} alt="Some boss bitches" />
	</div>
	<div class="rounded-box">
		<img src={notice} alt="The truth" />
	</div>
</div>
