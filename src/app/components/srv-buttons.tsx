// "use server";
import {
	LinkButton,
	QueryButton,
} from "./buttons";
import { Language } from "@/conf/dictionary.conf";

export type ButtonProps = {
	label: string;
	route: string;
	props?: {
		[key: string]: string;
	},
	type?: "link";
};

export interface QueryButtonProps extends Omit<ButtonProps, 'type'> {
	type: "query";
	defaultState: string;
	params: string;
}

export async function Buttons({
	buttons,
	currentPath,
}: {
	buttons: (ButtonProps | QueryButtonProps)[];
	currentPath: string;
}) {

	return (
		<>
			{buttons.map((button) => {
				if (button.type === "link" || !button.type) {
					return (
						<LinkButton
							key={button.label}
							label={button.label}
							route={currentPath + button.route}
							props={button.props}
						/>
					);
				} else if (button.type === "query") {
					return (
						<QueryButton
							key={button.label}
							label={button.label}
							route={currentPath + button.route}
							props={button.props}
							params={button.params}
							defaultState={button.defaultState}
						/>
					);
				}
			})}
		</>
	);
}
