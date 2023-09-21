"use client";
import React, {use, Suspense} from "react";
import {Navbar as NextNavbar, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Image} from "@nextui-org/react";

export default function Navbar({
	children,
	// lang,
	icon,
}: {
	children: React.ReactNode,
	// lang: string,
	icon: string,
}) {
	// const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	return (
		<NextNavbar
			shouldHideOnScroll={true}
			// onMenuOpenChange={setIsMenuOpen}
		>
			<NavbarBrand>
				<div>
				<Image
					src={icon}
					alt="Bike Icon"
					height={50}
					width={50}
					radius="sm"
					/>
				<p className="font-bold text-inherit">Bicycle Share</p>
				</div>
			</NavbarBrand>
			<NavbarContent justify="end">
				<NavbarItem>
					{children}
				</NavbarItem>
			</NavbarContent>
		</NextNavbar>
	);
}

export function UserMenu({
	user,
	children,
}: {
	user: Promise<User>
	children: React.ReactNode
}) {

	const compensateStyle =
		`absolute h-8 w-8 rounded-full
		`;

	return (
		<>
		<Suspense>
			<DisplayAvatar user={user} />
		</Suspense>
		<Dropdown placement="bottom-end">
			<DropdownTrigger className={"display-none"}>
				<div className={compensateStyle} style={{
					transform: "translateY(-32px)",
				}}></div>
			</DropdownTrigger>
			<DropdownMenu aria-label="Profile Actions" variant="flat">
			<DropdownItem key="logout" className="h-14 gap-2">
				{children}
			</DropdownItem>
			</DropdownMenu>
		</Dropdown>
		</>
	);
}

interface User {
	name: string
	image: string
	username: string
}

function DisplayAvatar({
	user,
}: {
	user: Promise<User>
}) {

	const data = use(user);
	return (
		<Avatar
			isBordered
			as="button"
			className="transition-transform"
			color=""
			name={data.name}
			description={data.username}
			size="sm"
			src={data.image}
		/>
	);
}

export function UserMenuItem({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<DropdownItem key="logout" className="h-14 gap-2">
				{children}
			</DropdownItem>
		</>
	);
}