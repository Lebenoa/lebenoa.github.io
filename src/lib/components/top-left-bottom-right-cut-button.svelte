<script lang="ts">
    type Props = {
        size?: "md" | "lg";
        buttonStyle?: string;
        textStyle?: string;
        textColor?: string;
        strokeColor?: string;

        // start with `group-hover:`
        hoverStyle?: string;
        hoverTextStyle?: string;

        active?: boolean;
        activeStyle?: string;
        activeTextStyle?: string;

        children: any;

        [key: string]: unknown;
    };

    let {
        size = "md",
        buttonStyle = "",
        textStyle = "text-xl",
        textColor = "text-cyan-300",
        strokeColor = "stroke-cyan-300",

        hoverStyle = "group-hover:fill-cyan-300/20 group-hover:stroke-cyan-300",
        hoverTextStyle = "",

        active = false,
        activeStyle = "fill-cyan-300 stroke-cyan-300",
        activeTextStyle = "text-black",

        children,

        ...rest
    }: Props = $props();

    const sizes = {
        md: { width: 280, height: 50, cut: 50, classes: "h-[50px] w-[280px]" },
        lg: { width: 300, height: 50, cut: 50, classes: "h-[50px] w-[300px]" }
    } as const;

    // chamfered top-left and bottom-right corners, relative to the element box
    const clipClasses =
        "[clip-path:polygon(50px_0,100%_0,100%_calc(100%_-_50px),calc(100%_-_50px)_100%,0_100%,0_50px)]";

    const geometry = $derived(sizes[size]);

    const points = $derived(
        `${geometry.cut},0 ${geometry.width},0 ${geometry.width},${geometry.height - geometry.cut} ${geometry.width - geometry.cut},${geometry.height} 0,${geometry.height} 0,${geometry.cut}`
    );
</script>

<button
    {...rest}
    type="button"
    class="group relative flex cursor-pointer items-center justify-center border-none bg-none p-0 focus-visible:outline-none [&:focus-visible>svg>polygon]:stroke-white [&:focus-visible>svg>polygon]:stroke-[3px] {clipClasses} {geometry.classes} {buttonStyle}"
>
    <svg
        class="absolute top-0 left-0 h-full w-full"
        viewBox="0 0 {geometry.width} {geometry.height}"
    >
        <polygon
            class="z-0 stroke-2 transition-colors duration-300 ease-in-out {active
                ? activeStyle
                : 'fill-transparent ' + strokeColor + ' ' + hoverStyle}"
            {points}
        />
    </svg>
    <p
        class="z-1 transition-colors duration-300 {textStyle} {active
            ? activeTextStyle
            : textColor + ' ' + hoverTextStyle}"
    >
        {@render children()}
    </p>
</button>
