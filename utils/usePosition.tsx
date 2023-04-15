import { RefObject, useCallback, useEffect, useState } from "react";

export function usePosition(ref: RefObject<HTMLDivElement>) {
	const [prevElement, setPrevElement] = useState<Element | null>(null);
	const [nextElement, setNextElement] = useState<Element | null>(null);
	useEffect(() => {
		const element = ref.current as HTMLDivElement;
		const update = () => {
			const rect = element.getBoundingClientRect();
			const visibleElements = Array.from(element.children).filter((child) => {
				const childRect = child.getBoundingClientRect();
				return rect.left <= childRect.left && rect.right >= childRect.right;
			});
			if (visibleElements.length > 0) {
				setPrevElement(getPrevElement(visibleElements));
				setNextElement(getNextElement(visibleElements));
			}
		};

		update();
		element.addEventListener("scroll", update, { passive: true });
		return () => {
			element.removeEventListener("scroll", update, {
				passive: true,
			} as unknown as EventListenerOptions);
		};
	}, [ref]);

	const scrollToElement = useCallback(
		(element: Element | null) => {
			const currentNode = ref.current as HTMLDivElement;

			if (!currentNode || !element) return;

			let newScrollPosition;

			newScrollPosition =
				(element as HTMLDivElement).offsetLeft +
				element.getBoundingClientRect().width / 2 -
				currentNode.getBoundingClientRect().width / 2;

			currentNode.scroll({
				left: newScrollPosition,
				behavior: "smooth",
			});
		},
		[ref]
	);

	const scrollRight = useCallback(
		() => scrollToElement(nextElement),
		[scrollToElement, nextElement]
	);

	const scrollLeft = useCallback(
		() => scrollToElement(prevElement),
		[scrollToElement, prevElement]
	);

	return {
		hasItemsOnLeft: prevElement !== null,
		hasItemsOnRight: nextElement !== null,
		scrollLeft,
		scrollRight,
	};
}

function getPrevElement(list: Element[]) {
	const sibling = list[0].previousElementSibling;

	if (sibling instanceof HTMLElement) {
		return sibling;
	}

	return sibling;
}

function getNextElement(list: Element[]) {
	const sibling = list[list.length - 1].nextElementSibling;
	if (sibling instanceof HTMLElement) {
		return sibling;
	}
	return null;
}
