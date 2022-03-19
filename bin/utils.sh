#!/usr/bin/env bash

#
# Set Colors
#

bold="\e[1m"
dim="\e[2m"
underline="\e[4m"
reset="\e[0m"
red="\e[31m"
green="\e[32m"
blue="\e[34m"

#
# Common Output Styles
#

h1() {
	printf "\n${bold}${underline}%s${reset}\n" "$(echo "$@" | sed '/./,$!d')"
}
h2() {
	printf "\n${bold}%s${reset}\n" "$(echo "$@" | sed '/./,$!d')"
}
info() {
	printf "${dim}➜ %s${reset}\n" "$(echo "$@" | sed '/./,$!d')"
}
success() {
	printf "${green}%s${reset}\n" "$(echo "$@" | sed '/./,$!d')"
}
error() {
	printf "${red}${bold}✖ %s${reset}\n" "$(echo "$@" | sed '/./,$!d')"
}
warnError() {
	printf "${red}✖ %s${reset}\n" "$(echo "$@" | sed '/./,$!d')"
}
warnNotice() {
	printf "${blue}✖ %s${reset}\n" "$(echo "$@" | sed '/./,$!d')"
}
note() {
	printf "\n${bold}${blue}Note:${reset} ${blue}%s${reset}\n" "$(echo "$@" | sed '/./,$!d')"
}
withinBlock() {
	printf " --- %s\n" "$(echo "$@" | sed '/./,$!d')"
}

# Runs the specified command and logs it appropriately.
#   $1 = command
#   $2 = (optional) error message
#   $3 = (optional) success message
#   $4 = (optional) global variable to assign the output to
run_command() {
	command="${1:-}"
	info "$command"
	error_message="${2:-}"
	success_message="${3:-}"
	gvar="${4:-}"
	exec 5>&1
	output="$(eval "${command}" 2>&1 | tee >(cat - >&5); exit "${PIPESTATUS[0]}")"
	ret_code=$?

	if [ ${ret_code} != 0 ]; then
		if [ -n "$error_message" ]; then
			error "$error_message"
		fi
		exit ${ret_code}
	fi
	if [ -n "$success_message" ]; then
		success "$success_message"
	fi
	if [ -n "$gvar" ]; then
		eval "$gvar='$output'"
	fi
}

error_message_for_binary_missing() {
	local binary
	local documentation_url
	binary="${1:-}"
	documentation_url="${2:-}"
	read -r -d '' MSG <<- EOM
		${red}${bold}✖ ${binary} isn't installed on your system.${reset}

		Follow the instructions at ${documentation_url} to install

		${red}Once ${binary} has been installed, run bin/setup to continue${reset}
	EOM
	printf "%b" "$MSG"
}
