<script lang="ts">
  import Swal from "sweetalert2";
  import Button from "./lib/components/Button.svelte";
  // @ts-ignore -- No declaration file for this :(
  import toastr from "toastr";

  import logo from "./assets/img/np_logo.svg";
  import dollarSign from "./assets/icon/fa/dollar-sign.svg";

  function priceToPoints(amt: number): number {
    return amt * 100;
  }

  const numberFormatter = new Intl.NumberFormat("en-US");
  function formatPoints(amt: number): string {
    return `${numberFormatter.format(amt)} Credits`;
  }

  let selectedAmount = 5;
  $: pointAmount = priceToPoints(selectedAmount);

  const moneyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const suggestedAmounts = [5, 10, 50, 100];

  const servers = ["DarkRP 1", "DarkRP 2", "DarkRP 3", "DarkRP 4"];
  async function completePurchase(realMoneyAmount: number) {
    const html = `You will pay <em>${moneyFormatter.format(realMoneyAmount)}</em> for <em>${formatPoints(priceToPoints(realMoneyAmount))}</em>`;
    const confirmPopup = await Swal.fire({
      title: "Confirm your purchase",
      html: html,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "var(--accent)",
    });

    if (!confirmPopup.isConfirmed) return;
    for (const [i, server] of Object.entries(servers)) {
      setTimeout(
        () => {
          toastr.success(
            `The ${server} server has been notified about your donation.`,
            "Server Notified"
          );
        },
        Number(i) * Math.random() * 1000
      );
    }
  }
</script>

<div class="outer-content">
  <div class="logo">
    <img src={logo} alt="Server Logo" />
  </div>

  <div class="card">
    <div class="topbar">
      <h2>Make a donation</h2>
    </div>

    <div class="content">
      <div class="account">
        <div class="left">
          <img
            src="https://avatars.akamai.steamstatic.com/d5d57e7cab58036ce2b2915e7838216920a2d7d3_full.jpg"
            alt="Profile Icon"
            class="profile-img"
          />
          <div class="text">
            <p class="name">Lion</p>
            <p class="desc">STEAM_0:0:211743176</p>
          </div>
        </div>
        <div class="right">
          <button on:click={() => alert("Pretend you switched accounts!")}
            >Switch Account</button
          >
        </div>
      </div>

      <p>
        Servers cost money. Making a donation ensures the server's longevity
        wile also giving you some epic perks.
      </p>

      <hr />
      <p class="secondary-text">How much would you like to donate?</p>
      <div class="suggestions">
        {#each suggestedAmounts as amt}
          <Button
            style="flex-grow: 1;"
            active={amt == selectedAmount}
            on:click={() => (selectedAmount = amt)}
            ><em>{formatPoints(priceToPoints(amt))}</em><br /><small
              >{moneyFormatter.format(amt)}</small
            ></Button
          >
        {/each}
      </div>

      <div class="input-group">
        <img src={dollarSign} alt="dollar sign icon" />
        <input
          class="suggestion-input"
          type="number"
          bind:value={selectedAmount}
        />
      </div>

      <hr />

      <div class="finalization">
        <p>Ready to get the credits?</p>
        <Button
          active
          rounded
          on:click={() => completePurchase(selectedAmount)}
        >
          Complete Purchase</Button
        >
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @import "./assets/css/theme.scss";

  .outer-content {
    width: 100%;
    min-height: 100vh;
    background-color: rgba(20, 20, 20, 0.5);
    backdrop-filter: blur(5px);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    .card {
      background: $card-bg;
      border-radius: $border-rad;
      overflow: hidden;
      max-width: 75%;

      filter: drop-shadow(0 0 0.25rem black);

      @media (max-width: 1080px) {
        max-width: 90vw;
      }

      .topbar {
        background: $accent;
        padding: 1rem;
        font-weight: bold;
        font-size: 1.25rem;
        color: $title;
      }

      .finalization {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }

      .content {
        padding: 1rem;
        font-size: 1.25rem;

        .account {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          gap: 1rem;

          margin-bottom: 1rem;

          background: $dark;
          padding: 0.5rem;
          border-radius: $border-rad;

          .left {
            display: flex;
            flex-direction: row;
            gap: 1rem;
            height: 100%;

            img {
              height: 3rem;
              border-radius: $border-rad;
            }

            .text {
              display: flex;
              flex-direction: column;
              justify-content: center;

              .name {
                font-weight: 500;
                font-size: 1.25rem;
              }

              .desc {
                opacity: 0.7;
                font-size: 0.75rem;
              }
            }
          }

          .right {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;

            button {
              background: none;
              border: none;
              color: $accent;
              text-decoration: underline;
              font-size: 1.15rem;
              cursor: pointer;
              font-weight: bold;
            }
          }
        }

        .suggestions {
          border-radius: $border-rad;
          overflow: hidden;
          display: flex;
          flex-direction: row;
          margin-top: 0.5rem;

          @media (max-width: 600px) {
            flex-direction: column;
          }
        }

        .input-group {
          display: flex;
          flex-direction: row;
          gap: 0.5rem;

          margin-top: 1rem;
          background: $background;
          border: none;
          border-radius: $border-rad;
          padding: 0.5rem;
          font-size: 1.15rem;
          color: $text;
          width: 100%;
          box-sizing: border-box;

          &:focus-within {
            outline: 1px solid #ffffff28;
          }

          input {
            background: none;
            border: none;
            color: $text;
            font-size: 1.15rem;
            height: 100%;
            box-sizing: border-box;
            width: 100%;

            &:focus {
              outline: none;
            }
          }

          img {
            height: 100%;
            width: 1rem;
            color: white;
            fill: white;
            filter: invert(84%) sepia(99%) saturate(7475%) hue-rotate(180deg)
              brightness(131%) contrast(100%);
            opacity: 0.7;
          }
        }
      }
    }
  }

  :global(.btn.active) {
    :global(em) {
      color: $text;
    }
  }
</style>
