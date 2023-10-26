"use client"
import React from "react";
import {Navbar as NextNavbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Link,
	DropdownItem,
	DropdownTrigger,
	DropdownSection,
	Dropdown,
	DropdownMenu,
	Avatar,
	Image
} from "@nextui-org/react";
import {useScrollContext} from "../components/NavbarRef";
import {useRouter} from "next/navigation";

export default function Navbar({
	children,
	icon,
	title,
}: {
	children: React.ReactNode,
	icon: string,
	title: string,
}) {


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

import { signOut } from "next-auth/react"

export function UserMenu({
	user,
	terms,
	methods,
	options
}: {
	user: User
	terms: {
		language: string,
		logout: string,
		admin: string,
		open: string,
	}
	methods: {
		[methodName: string]: (data: any) => void
	}
	options: {
		languages: {code: string, label: string}[],
		selectedLanguage: string,
		showAdmin: boolean,
		link_prefix: string,
	}
}) {
	const router = useRouter();
	const compensateStyle =
		`absolute h-8 w-8 rounded-full
		`;
	const logOut = () => {
		signOut();
	};

	const show_admin = () => {
		if (options.showAdmin) {
			return "";
		} else {
			return "hidden";
		}
	}

	const open_admin = () => {
		if (options.showAdmin) {
			router.push(`${options.link_prefix}/admin`);
		}
	}

	return (
		<>
		<DisplayAvatar user={user} />
		<Dropdown placement="bottom-end" backdrop={"blur"}>
			<DropdownTrigger className={"display-none"}>
				<div className={compensateStyle} style={{
					transform: "translateY(-32px)",
				}}></div>
			</DropdownTrigger>
			<DropdownMenu aria-label="Profile Actions" variant="flat">
			<DropdownSection aria-label="Profile">
				<DropdownItem
					isReadOnly
					key={"user"}
					className="cursor-default"
				>
					{user.name}
				</DropdownItem>
				<DropdownItem
					// isReadOnly
					closeOnSelect={true}
					key={terms.admin}
					className={`cursor-default ${show_admin()}`}
					onClick={open_admin}
				>
					{terms.admin}
				</DropdownItem>
			</DropdownSection>
			<DropdownSection aria-label="Preferences" showDivider>
				<DropdownItem
					isReadOnly
					key={terms.language}
					className="cursor-default"
					endContent={
						<LanguageSelectMenuItem
							method={methods.changeLanguage}
							languages={options.languages}
							selectedLanguage={options.selectedLanguage}
						/>
					}
				>
					{terms.language}
				</DropdownItem>
				</DropdownSection> 
				<DropdownSection aria-label="Help & Feedback">
				<DropdownItem
					key="logout"
					onClick={logOut}
					>
					{terms.logout}
				</DropdownItem>
				</DropdownSection>
			</DropdownMenu>
		</Dropdown>
		</>
	);
}

export const AdminSection = ({}: {}) => {
	return (
		<DropdownSection aria-label="Admin" showDivider>
			<DropdownItem
				key="admin"
				endContent={
					<Link href="/admin">
						Admin
					</Link>
				}
			>
				Admin
			</DropdownItem>
		</DropdownSection>
	);
}

const LanguageSelectMenuItem = ({
	method,
	languages,
	selectedLanguage,
}: {
	method: (data: any) => void,
	languages: {code: string, label: string}[],
	selectedLanguage: string,
}) => {

	const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const language = event.target.value;
		method(language);
	};

	return (
		<>
			<select
				className="z-10 outline-none w-16 py-0.5 rounded-md text-tiny group-data-[hover=true]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent text-default-500"
				id="language"
				name="language"
				onChange={handleLanguageChange}
				>
				{languages.map((language) => (
					<option 
						key={language.code}
						value={language.code}
						selected={selectedLanguage === language.code}
					>
						{language.label}
					</option>
				))}
			</select>
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
