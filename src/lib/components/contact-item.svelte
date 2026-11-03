<script lang="ts">
    import type { Contact } from "#lib/types/index";
    let { info }: { info: Contact } = $props();
</script>

<a
    class="flex h-fit w-fit flex-col items-center border border-transparent px-8 py-6 transition-colors duration-200 active:border-cyan-500 active:bg-cyan-500/25 lg:hover:border-cyan-500 lg:hover:bg-cyan-500/25"
    href={info.link}
    target="_blank"
>
    <img class="mb-2 h-24 w-auto" src={info.icon} alt={info.alt} />
    <p class="text-lg">{info.label}</p>
</a>
