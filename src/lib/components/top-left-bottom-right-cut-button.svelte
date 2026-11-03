<script lang="ts">
    let {
        width = 150,
        height = 50,
        cutCorner = 15,
        buttonStyle = "",
        textStyle = "text-xl",
        textColor = "text-cyan-300",
        strokeColor = "stroke-cyan-300",

        // start with `group-hover:`
        hoverStyle = "group-hover:fill-cyan-300/20 group-hover:stroke-cyan-300",
        hoverTextStyle = "",

        active = false,
        activeStyle = "fill-cyan-300 stroke-cyan-300",
        activeTextStyle = "text-black",

        children,

        ...rest
    }: {
        width?: number;
        height?: number;
        cutCorner?: number;
        buttonStyle?: string;
        textStyle?: string;
        textColor?: string;
        strokeColor?: string;

        hoverStyle?: string;
        hoverTextStyle?: string;

        active?: boolean;
        activeStyle?: string;
        activeTextStyle?: string;

        children: any;

        [key: string]: unknown;
    } = $props();

    if (width < 50) {
        width = 50;
    }

    if (height < 50) {
        height = 50;
    }

    let clipPath = `clip-path: polygon(${cutCorner}px 0%, 100% 0%, 100% ${
        height - cutCorner
    }px, ${width - cutCorner}px 100%, 0% 100%, 0% ${cutCorner}px);`;
</script>

<button
    {...rest}
    type="button"
    class="group relative flex cursor-pointer items-center justify-center border-none bg-none p-0 focus-visible:outline-none [&:focus-visible>svg>polygon]:stroke-white [&:focus-visible>svg>polygon]:stroke-[3px] {buttonStyle}"
    style="width: {width}px; height: {height}px; {clipPath};"
>
    <svg
        class="absolute top-0 left-0"
        style="height: {height}px; width: {width}px; {clipPath};"
        viewBox="0 0 {width} {height}"
    >
        <polygon
            class="z-0 stroke-2 transition-colors duration-300 ease-in-out {active
                ? activeStyle
                : 'fill-transparent ' + strokeColor + ' ' + hoverStyle}"
            style="{clipPath};"
            points="{cutCorner},0 {width},0 {width},{height - cutCorner} {width -
                cutCorner},{height} 0,{height} 0,{cutCorner}"
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
