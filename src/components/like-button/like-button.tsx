import { Component, Event, EventEmitter, Prop, State } from "@stencil/core";

@Component({
  tag: "like-button",
  styleUrl: "like-button.css",
  shadow: true
})
export class LikeButton {
  /**
   * Print log messages?
   */
  debug: boolean = true;

  /**
   * Cache key for localStorage
   */
  @Prop() key: string = "crds-likes";

  /**
   * Unique identifier for likeable resource
   */
  @Prop() id: string;

  /**
   * Boolean indicating whether likeable resource has been liked
   */
  @Prop({ mutable: true }) isLiked: boolean;

  /**
   * Label for "like" state
   */
  @Prop() likeLabel: string = "Like";

  /**
   * Label for "unlike" state
   */
  @Prop() unlikeLabel: string = "Unlike";

  /**
   * Event emitter for "on complete" of like toggle
   */
  @Event() likeCompleted: EventEmitter;

  /**
   * Emphemeral array object for managing updates to localStorage
   */
  @State() _likes: String[] = [];

  /**
   * Fires before render...
   */
  componentWillLoad() {
    this.isLiked = this.likes().includes(this.id);
  }

  /**
   * Returns array of all liked ids from localStorage
   */
  likes() {
    const ids = localStorage.getItem(this.key);
    return ids ? JSON.parse(ids) : [];
  }

  /**
   */
  label() {
    return this.isLiked ? this.unlikeLabel : this.likeLabel;
  }

  /**
   * Handle storage addition/removal of likeable resource ID
   * @param e Event
   */
  toggle(e) {
    this.log("toggle()");
    e.preventDefault();
    if (this.isLiked) {
      this.remove();
    } else {
      this.add();
    }
    this.isLiked = !this.isLiked;
  }

  /**
   * Removes current ID from localStorage
   */
  remove() {
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
  add() {
    this._likes = this.likes();
    this._likes.push(this.id);
    this.save(this._likes);
  }

  /**
   * Persist array of IDs to localStorage
   * @param arr Array of likeable resource IDs
   */
  save(arr) {
    this.log("save()");
    localStorage.setItem(this.key, JSON.stringify(arr));
    this.likeCompleted.emit(this.id);
  }

  log(ns, msg = "") {
    if (this.debug) {
      console.log(ns, msg);
    }
  }

  render() {
    return (
      <a href="#" onClick={e => this.toggle(e)}>
        {this.label()} {this.id}
      </a>
    );
  }
}
