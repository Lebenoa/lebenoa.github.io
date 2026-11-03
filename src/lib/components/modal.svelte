<script lang="ts">
    import { tick } from "svelte";
    import { fade, scale } from "svelte/transition";

    type Props = {
        open: boolean;
        label?: string;
        containerClass?: string;
        bodyClass?: string;
        outsideButtonClass?: string;
        fadeDuration?: number;
        bodyTransitionDuration?: number;
        children?: any;
    };

    let {
        open = $bindable(false),
        label = "Dialog",
        containerClass,
        bodyClass,
        outsideButtonClass,
        fadeDuration = 300,
        bodyTransitionDuration = 300,
        children
    }: Props = $props();

    const focusableSelector =
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    let bodyElement = $state<HTMLDivElement>();
    let lastFocused: HTMLElement | null = null;

    function focusableItems(): HTMLElement[] {
        if (!bodyElement) return [];
        return Array.from(bodyElement.querySelectorAll<HTMLElement>(focusableSelector));
    }

    function close() {
        open = false;
    }

    function onkeydown(event: KeyboardEvent) {
        if (!open) return;

        if (event.key === "Escape") {
            event.preventDefault();
            close();
            return;
        }

        if (event.key !== "Tab") return;

        const items = focusableItems();
        if (items.length === 0) return;

        const first = items[0];
        const last = items[items.length - 1];
        const active = document.activeElement;
        const inside = !!bodyElement?.contains(active);

        if (event.shiftKey && (active === first || !inside)) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && (active === last || !inside)) {
            event.preventDefault();
            first.focus();
        }
    }

    $effect(() => {
        if (!open) return;

        lastFocused = document.activeElement as HTMLElement | null;

        tick().then(() => {
            const [first] = focusableItems();
            (first ?? bodyElement)?.focus();
        });

        return () => {
            lastFocused?.focus();
            lastFocused = null;
        };
    });
</script>

<svelte:window {onkeydown} />

{#if open}
    <div class="fixed z-20 flex h-full w-full items-center justify-center {containerClass}">
        <button
            class="fixed top-0 left-0 h-full w-full bg-black/50 text-transparent blur-lg focus-visible:outline-2 focus-visible:outline-offset-[-8px] focus-visible:outline-cyan-500 {outsideButtonClass} z-10"
            type="button"
            aria-label="Close dialog"
            transition:fade={{ duration: fadeDuration }}
            onclick={close}
        >
            X
        </button>
        <div
            bind:this={bodyElement}
            class="z-[21] {bodyClass}"
            role="dialog"
            aria-modal="true"
            aria-label={label}
            tabindex="-1"
            transition:scale={{ duration: bodyTransitionDuration }}
        >
            {@render children()}
        </div>
    </div>
{/if}
