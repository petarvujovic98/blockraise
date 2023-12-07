export function Virus2Svg({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 3.05484C10.7042 3.0875 10.413 3.13446 10.1269 3.19498C9.58659 3.30929 9.0559 2.96394 8.94159 2.42362C8.82728 1.88329 9.17263 1.3526 9.71295 1.23829C10.4516 1.08202 11.2168 1 12 1C12.7832 1 13.5484 1.08202 14.287 1.23829C14.8274 1.3526 15.1727 1.88329 15.0584 2.42362C14.9441 2.96394 14.4134 3.30929 13.8731 3.19498C13.587 3.13446 13.2958 3.0875 13 3.05484V7.10002C13.6384 7.2296 14.2325 7.48079 14.7573 7.82836L17.6177 4.96803C17.3878 4.78414 17.1487 4.61127 16.9013 4.45026C16.4384 4.14905 16.3073 3.5296 16.6085 3.06669C16.9097 2.60377 17.5291 2.47268 17.9921 2.77389C19.2834 3.61413 20.387 4.71796 21.2271 6.00944C21.5282 6.47241 21.397 7.09183 20.9341 7.39297C20.4711 7.6941 19.8517 7.56291 19.5505 7.09995C19.3893 6.85202 19.2161 6.61251 19.0319 6.38224L16.1716 9.24256C16.5192 9.76737 16.7704 10.3616 16.9 11H20.9452C20.9125 10.7042 20.8655 10.4129 20.805 10.1268C20.6907 9.58646 21.036 9.05576 21.5763 8.94144C22.1167 8.82712 22.6474 9.17246 22.7617 9.71278C22.918 10.4515 23 11.2167 23 12C23 12.783 22.918 13.5479 22.7619 14.2863C22.6476 14.8267 22.1169 15.1721 21.5766 15.0578C21.0363 14.9435 20.6909 14.4128 20.8051 13.8725C20.8656 13.5866 20.9125 13.2956 20.9452 13H16.9C16.7704 13.6384 16.5192 14.2325 16.1716 14.7573L19.032 17.6177C19.2152 17.3886 19.3875 17.1504 19.548 16.9039C19.8494 16.4411 20.4689 16.3102 20.9317 16.6116C21.3945 16.9129 21.5254 17.5324 21.224 17.9952C20.3839 19.2855 19.2805 20.3882 17.9896 21.2277C17.5267 21.5288 16.9072 21.3975 16.6062 20.9345C16.3051 20.4715 16.4363 19.8521 16.8993 19.551C17.1475 19.3896 17.3873 19.2163 17.6178 19.0319L14.7574 16.1716C14.2326 16.5192 13.6384 16.7704 13 16.9V20.9452C13.2948 20.9126 13.5852 20.8658 13.8704 20.8056C14.4107 20.6914 14.9413 21.037 15.0555 21.5773C15.1696 22.1177 14.8241 22.6483 14.2837 22.7624C13.5461 22.9182 12.7821 23 12 23C11.215 23 10.4482 22.9176 9.70804 22.7607C9.16777 22.6461 8.82266 22.1153 8.93722 21.575C9.05178 21.0347 9.58263 20.6896 10.1229 20.8042C10.4102 20.8651 10.7028 20.9124 11 20.9452V16.9C10.3616 16.7704 9.76737 16.5192 9.24256 16.1716L6.38224 19.0319C6.61224 19.2159 6.85146 19.3889 7.09908 19.55C7.56201 19.8512 7.69313 20.4706 7.39194 20.9335C7.09076 21.3965 6.47132 21.5276 6.00839 21.2264C4.71887 20.3874 3.6165 19.2856 2.77685 17.9966C2.47541 17.5338 2.6062 16.9143 3.06897 16.6129C3.53173 16.3114 4.15125 16.4422 4.45268 16.905C4.61301 17.1511 4.78506 17.389 4.96803 17.6177L7.82836 14.7573C7.48079 14.2325 7.2296 13.6384 7.10002 13H3.05484C3.0875 13.2958 3.13447 13.5871 3.19501 13.8732C3.30933 14.4135 2.96399 14.9442 2.42366 15.0586C1.88334 15.1729 1.35265 14.8275 1.23832 14.2872C1.08203 13.5485 1 12.7833 1 12C1 11.2156 1.08227 10.4492 1.23901 9.70954C1.3535 9.16925 1.8843 8.82407 2.42458 8.93855C2.96487 9.05304 3.31005 9.58384 3.19557 10.1241C3.13476 10.4111 3.0876 10.7033 3.05484 11H7.10002C7.22961 10.3616 7.48082 9.76737 7.82843 9.24256L4.96811 6.38224C4.78407 6.61228 4.61108 6.85154 4.44995 7.0992C4.14877 7.56214 3.52933 7.69327 3.0664 7.39209C2.60346 7.09091 2.47233 6.47147 2.77351 6.00853C3.61334 4.71765 4.71656 3.61429 6.00733 2.77429C6.47023 2.47305 7.08968 2.6041 7.39092 3.067C7.69216 3.52989 7.56112 4.14935 7.09822 4.45059C6.85094 4.61151 6.61205 4.78426 6.38234 4.96803L9.24266 7.82836C9.76746 7.48079 10.3616 7.2296 11 7.10002V3.05484Z"
        fill="currentColor"
      />
    </svg>
  );
}