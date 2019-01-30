import { Component, Prop, State } from "@stencil/core";
import dig from "object-dig";
import axios from "axios";

@Component({
  tag: "heart-button",
  styleUrl: "heart-button.scss",
  shadow: true
})
export class HeartButton {
  /**
   * Print log messages?
   */
  private debug: boolean = false;

  /**
   * Cache key for localStorage
   */
  @Prop() private key: string = "crds-hearts";

  /**
   * Unique identifier for likeable resource
   */
  @Prop() private id: string;

  /**
   * Total number of hearts
   */
  @Prop({ mutable: true }) private count: number;

  /**
   * Boolean indicating whether likeable resource has been liked
   */
  @Prop({ mutable: true }) private isLiked: boolean;

  /**
   * Emphemeral array object for managing updates to localStorage
   */
  @State() private _likes: String[] = [];

  /**
   * Fires before render...
   */
  public componentWillLoad() {
    this.isLiked = this.likes().includes(this.id);
    this.getCount().then(result => {
      this.count = result;
    });
  }

  /**
   * Returns total number of likes from Contentful
   */
  public getCount() {
    let api = `https://cdn.contentful.com/spaces/${this.space_id()}/environments/${this.env()}/entries`;

    return axios
      .get(`${api}/${this.id}`, {
        params: {
          access_token: this.token()
        }
      })
      .then(success => {
        return dig(success, "data", "fields", "interaction_count") || 0;
      });
  }

  /**
   * Return count value, abbreviated for large numbers
   */
  private abbrevCount() {
    if (this.count > 1000) {
      let float = this.count / 1000;
      let n = Math.round(float * 4) / 4;
      return `${n}K`;
    } else {
      return (this.count || 0).toString();
    }
  }

  /**
   * Returns array of all liked ids from localStorage
   */
  private likes() {
    const ids = localStorage.getItem(this.key);
    return ids ? JSON.parse(ids) : [];
  }

  /**
   * Handle storage addition/removal of likeable resource ID
   * @param e Event
   */
  private toggle(e) {
    this.log("toggle()");
    e.preventDefault();
    this.isLiked = !this.isLiked;
    if (this.isLiked) {
      this.add();
      this.count++;
    } else {
      this.remove();
      if (this.count > 0) {
        this.count--;
      }
    }
  }

  /**
   * Removes current ID from localStorage
   */
  private remove() {
    this.log("removeFromStore()");
    this._likes = this.likes().filter(id => {
      if (id.toString() !== this.id) {
        return id;
      }
    });
    this.save(this._likes);
  }

  /**
   * Add current ID to localStorage
   */
  private add() {
    this._likes = this.likes();
    this._likes.push(this.id);
    this.save(this.removeDuplicates(this._likes));
  }

  public removeDuplicates(arr) {
    return Array.from(new Set(arr));
  }

  /**
   * Persist array of IDs to localStorage
   * @param arr Array of likeable resource IDs
   */
  private save(arr) {
    this.log("save()");
    localStorage.setItem(this.key, JSON.stringify(arr));
    axios.post(`${this.endpoint()}/content-interactions`, {
      entry_id: this.id,
      action: this.isLiked ? "add" : "subtract"
    });
  }

  /**
   * Log a message to the console if debug=true
   * @param ns String
   * @param msg String (optional)
   */
  private log(ns, msg = "") {
    if (this.debug) {
      console.log(ns, msg);
    }
  }

  /**
   * Returns space_id
   */
  private space_id() {
    return this.getMeta("cfl:space_id") || process.env.CONTENTFUL_SPACE_ID;
  }

  /**
   * Returns environment
   */
  private env() {
    return this.getMeta("cfl:env") || process.env.CONTENTFUL_ENV || "master";
  }

  /**
   * Returns delivery token
   */
  private token() {
    return this.getMeta("cfl:token") || process.env.CONTENTFUL_ACCESS_TOKEN;
  }

  /**
   * Returns service endpoint
   */
  private endpoint() {
    return (
      this.getMeta("crds:interactions-endpoint") ||
      process.env.CRDS_INTERACTIONS_ENDPOINT
    );
  }

  /**
   * Returns content metatag who's property matches "prop"
   * @param prop Value of metatags prop attribute
   */
  private getMeta(prop) {
    let el = document.querySelector(`meta[property*="${prop}"]`);
    if (el) {
      return el.getAttribute("content");
    }
  }

  /**
   * HTML
   */
  public render() {
    let heart =
      '<svg width="256px" height="256px" viewBox="0 0 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="heart"><path d="M222.944078,39.3395243 C232.469215,47.3270078 239.075354,57.1577642 242.762502,68.8317796 C246.449652,80.505795 246.987363,92.2566154 244.37563,104.084241 C241.763898,115.911866 236.156363,126.126627 227.553015,134.728537 L138.600552,226.891836 C135.527926,229.963948 131.994414,231.5 128,231.5 C124.005586,231.5 120.472074,229.963948 117.399448,226.891836 L28.4469857,135.189353 C19.8436364,126.280238 14.2361025,115.911866 11.6243699,104.084241 C9.01263721,92.2566154 9.55034867,80.505795 13.2374974,68.8317796 C16.924646,57.1577642 23.5307851,47.3270078 33.0559215,39.3395243 C41.3520061,32.2736738 50.7235066,27.8191121 61.1704302,25.9758461 C71.6173538,24.1325802 81.9106415,24.90061 92.0503004,28.2799285 C102.189959,31.6592471 111.100566,37.3426551 118.782129,45.3301387 L128,54.5464684 L137.217871,45.3301387 C144.899434,37.3426551 153.810041,31.6592471 163.9497,28.2799285 C174.089359,24.90061 184.382646,24.1325802 194.82957,25.9758461 C205.276493,27.8191121 214.647994,32.2736738 222.944078,39.3395243 Z" id="Path"></path></g></svg>';
    let heart_o =
      '<svg width="256px" height="256px" viewBox="0 0 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="heart-o"><path d="M218.116413,43.6103959 C227.157221,51.1917362 233.427455,60.5226236 236.927121,71.603045 C240.426788,82.6834664 240.937158,93.8367875 238.458225,105.063008 C235.979293,116.289229 230.656887,125.984595 222.490997,134.14912 L138.061541,221.626149 C135.14515,224.542052 131.791308,226 128,226 C124.208692,226 120.85485,224.542052 117.938459,221.626149 L33.5090034,134.586505 C25.3431125,126.130395 20.0207075,116.289229 17.5417748,105.063008 C15.0628421,93.8367875 15.5732123,82.6834664 19.0728789,71.603045 C22.5725454,60.5226236 28.7698738,51.1917362 37.6648574,43.6103959 C46.559841,36.0290557 56.4026531,31.6552043 67.1932938,30.4888417 C76.8173768,29.3224791 86.587277,30.6346345 96.5030011,34.425308 C105.543809,37.9243891 113.126417,42.8814185 119.250834,49.2964028 L128,58.4814907 L136.749166,49.2964028 C144.040141,41.7150625 152.570578,36.3206413 162.340478,33.1131525 C172.110378,29.9056637 181.95319,29.1766863 191.868914,30.9262268 C201.784638,32.6757674 210.533805,36.903826 218.116413,43.6103959 Z M212.429455,124.526647 C218.262231,118.694847 222.272267,111.477993 224.459559,102.876083 C226.646851,94.2741726 226.573939,85.8909618 224.24083,77.726437 C221.61608,68.3955562 216.585309,60.5955167 209.148518,54.3263319 C201.711727,48.0571471 193.47293,44.630959 184.432123,44.0477811 C177.141149,43.7561888 169.704357,45.3599365 162.121749,48.8590176 C155.705691,51.4833285 150.602015,54.9824096 146.810708,59.356261 L128,78.6012073 L109.189292,59.356261 C105.10635,54.9824096 100.002668,51.3375357 93.8782512,48.4216325 C86.2956426,44.9225514 78.8588512,43.4646031 71.567877,44.0477811 C62.5270696,44.630959 54.2882735,48.0571471 46.8514821,54.3263319 C39.4146907,60.5955167 34.38392,68.3955562 31.7591701,77.726437 C29.4260613,85.8909618 29.3531494,94.2741726 31.5404409,102.876083 C33.7277325,111.477993 37.7377693,118.694847 43.5705447,124.526647 L128,212.003675 L212.429455,124.526647 Z"></path></g></svg>';

    return (
      <a
        href="#"
        onClick={e => this.toggle(e)}
        class={this.isLiked ? "on" : "off"}
      >
        <span innerHTML={heart} class="icon heart" />
        <span innerHTML={heart_o} class="icon heart-o" />
        <span class="count">{this.abbrevCount()}</span>
      </a>
    );
  }
}
