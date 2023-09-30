"use client";
import React, {use, Suspense} from "react";
import {Navbar as NextNavbar, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Image} from "@nextui-org/react";

export default function Navbar({
	children,
	icon,
	title,
}: {
	children: React.ReactNode,
	icon: string,
	title: string,
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
				<p className="font-bold text-inherit">
					{title}
				</p>
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
	menuItems,
}: {
	user: User
	children: React.ReactNode
	menuItems: React.ReactNode[]
}) {

	const compensateStyle =
		`absolute h-8 w-8 rounded-full
		`;
	return (
		<>
		<DisplayAvatar user={user} />
		<Dropdown placement="bottom-end">
			<DropdownTrigger className={"display-none"}>
				<div className={compensateStyle} style={{
					transform: "translateY(-32px)",
				}}></div>
			</DropdownTrigger>
			<DropdownMenu aria-label="Profile Actions" variant="flat">
			{
				menuItems.map((item, index) => {
					return (
						<DropdownItem key={index} className="h-14 gap-2">
							{item}
						</DropdownItem>
					);
				})
			}
			</DropdownMenu>
		</Dropdown>
		</>
	);
}

interface User {
	name: string | null,
	image: string | null,
	username: string | null
}

function DisplayAvatar({
	user,
}: {
	user: User
}) {

	return (
		<Avatar
			isBordered
			as="button"
			className="transition-transform"
			color="default"
			name={user.name || "error"}
			size="sm"
			src={user.image || undefined}
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