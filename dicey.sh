initialize() {
    yarn=$(which yarn)
    [ ${#yarn} == 0 ] && { echo "yarn does not exist, installing"; brew install yarn --without-node; } || continue

    echo "☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️️☁️☁️☁️☁️☁️☁️☁️☁️☁️️️️️️️"
    echo "🚀\t${green}✔︎${normal} ${blue}yarn installed${normal}\t🚀"
    echo "🚀\t${green}✔︎${normal} ${magenta}Homebrew installed${normal}\t🚀"
    echo "🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊"

    rm -rf node_modules/ yarn.lock
    yarn
}

start() {
    yarn start
}

main() {
    echo
    read -p "${grey}Choose what you want to do:${normal}`echo $'\n\n '`[1]: initialize project`echo $'\n '`[2]: start packager`echo $'\n '`${standout}Enter selection:${normal} " -n 1 -r
    echo
    case "$REPLY" in
        1)
            initialize
            ;;
        2)
            start
            ;;
        *)
            echo "${red}Invalid selection${normal}"
            main
            ;;
    esac
}

echo "Dicey McDiceface Wizard"
main
